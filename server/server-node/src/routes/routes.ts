import express from 'express'
import bcrypt from 'bcrypt';
import { User } from "../entity/User";
import jsonwebtoken from 'jsonwebtoken'
import { authentication } from "./adminAuthentication";
import { addAdmin } from './populateUsers';
import { getUser, saveUser } from '../controller/controller';
import { UserTemp } from '../entity/UserTemp';

const jwt = jsonwebtoken;

let users: User[] = [];
const admin: User = {
    username: `tomik`, 
    password: '$2b$10$spqbiwkoTD3OUis.zB0oauJOCBAzU5VHX73nnWMPzZnE0uEZCykXu', 
    role: `ADMIN`
}

addAdmin(users,admin);

const router = express.Router();

router.get('/allUsers', async (req,res) => {
    const usersWithoutAdmin = await users.filter(user => user.role != 'ADMIN');
    res.send(JSON.stringify(usersWithoutAdmin))
});

router.get('/getAdmin', async (req,res) => {
    res.send(JSON.stringify(admin));
})

router.post(`/login`, async (req,res) => {
    const user: any = users.find(user => user.username == req.body.username);

    const userTemp = getUser(req.body.username);
    userTemp.then((value) => {
        console.log(value);
    });

    if(user == null){
        return res.status(400).send(`User not found`);
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(user.username,process.env.ACCESS_TOKEN_SECRET ?? '' );

            res.json({ token: accessToken, role: user.role}).status(200).send(`Success`);
        } else {
            res.status(401).send(`Not Allowed`);
        }
    } catch {
        res.status(500).send();
    }
});

router.post(`/registration`, authentication, async (req,res) => {
    try{
        const salt = await bcrypt.genSalt();
        const user = new UserTemp();
        user.username = req.body.username;
        user.password = await bcrypt.hash(req.body.password,salt);
        user.role = req.body.role;
        saveUser(user)
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

router.get(`/logout`,authentication,(req,res) => {
    var token = req.params.token;
    res.status(200).send();
});

// dočasne
router.post(`/saveAdmin`, async (req,res) => {
    const salt = await bcrypt.genSalt();
    const user = new UserTemp();
    user.username = `tomik`;
    user.password = await bcrypt.hash(`admin`,salt);
    user.role = `admin`;
    saveUser(user)
    res.status(200).send();
})

export =  router;