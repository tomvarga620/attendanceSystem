import express, { NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { env } from 'process'
import cors from 'cors';

declare var process : {
    env: {
        ACCESS_TOKEN_SECRET: string,
        REFRESH_TOKEN_SECRET: string
    }
}

env.ACCESS_TOKEN_SECRET = `98336a1588f0622fc46d6d7a4975cbf9251e3879af897b13366d44b25a05c95f7b6ff25db3c65989c82daa39224d5828843fad13c081ffdfdd551584d7aa551d`
env.REFRESH_TOKEN_SECRET = `190666f80f3dfbe9de82c8c9044e20999072268908a446c6181027295042b4144ef9e8291163db5722fb935dd17b3158989de5f84e9d31eec82948660f0194c8`

interface User {
    name: string,
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
const admin: User = {name: `tomik`, password: `admin`, role: `ADMIN`}
users.push(admin)

app.get('/admin', (req,res) => {
    res.send(JSON.stringify(users))
});

app.post(`/login`, async (req,res) => {
    let userToSend: any = users.find(user => user.name == req.body.name);
    users.forEach(user => console.log(user))
    if(userToSend == null){
        return res.status(400).send();
    } else {
        const accessToken = jwt.sign(userToSend.name, process.env.ACCESS_TOKEN_SECRET );
        return res.json({ token: accessToken, role: userToSend.role}).send();
    }
});

app.post(`/registration`,authentication,(req,res) => {
    const user = {name: req.body.name, password: req.body.password, role: `USER`}
    if(users.push(user)){
        users.forEach(user => console.log(user))
        res.status(201).send();
    }else {
        res.status(400).send();
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