import express, { NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { env } from 'process'
import cors from 'cors';
import bcrypt from 'bcrypt';

declare var process : {
    env: {
        ACCESS_TOKEN_SECRET: string,
        REFRESH_TOKEN_SECRET: string
    }
}

env.ACCESS_TOKEN_SECRET = `98336a1588f0622fc46d6d7a4975cbf9251e3879af897b13366d44b25a05c95f7b6ff25db3c65989c82daa39224d5828843fad13c081ffdfdd551584d7aa551d`
env.REFRESH_TOKEN_SECRET = `190666f80f3dfbe9de82c8c9044e20999072268908a446c6181027295042b4144ef9e8291163db5722fb935dd17b3158989de5f84e9d31eec82948660f0194c8`

interface User {
    username: string,
    password: string,
    role: string
}

const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Authorizations',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: `http://localhost:4200`,
    preflightContinue: false,
};

const jwt = jsonwebtoken
const app = express()
app.use(express.json())
app.use(cors(options))

let users: User[] = [];
const admin: User = {username: `tomik`, password: '$2b$10$spqbiwkoTD3OUis.zB0oauJOCBAzU5VHX73nnWMPzZnE0uEZCykXu', role: `ADMIN`}
users.push(admin)

app.get('/allUsers', async (req,res) => {
    res.send(JSON.stringify(users))
});

app.post(`/login`, async (req,res) => {
    const user: any = users.find(user => user.username == req.body.username);
    
    if(user == null){
        return res.status(400).send(`User not found`);
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET );
            res.json({ token: accessToken, role: user.role}).status(200).send(`Success`);
        } else {
            res.status(401).send(`Not Allowed`);
        }
    } catch {
        res.status(500).send();
    }
});

app.post(`/registration`, authentication, async (req,res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const user = {username: req.body.username, password: hashedPassword, role: req.body.role};
        console.log(user.username);
        console.log(hashedPassword);
        users.forEach((user) => console.log(user));
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.get(`/logout`,authentication,(req,res) => {
    var token = req.params.token;
    res.status(200).send();
});

function authentication(req: any, res:any, next: NextFunction){
    const authHeader = req.headers[`authorizations`];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(`401`);
    console.log(`Auth Token ${token}`)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000); 