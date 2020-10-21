import express from 'express'
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'
import { authentication } from "./adminAuthentication";
import { getAdmin, getAllUsers, loginUser, logoutUser, registerUser } from '../controller/user_controller';
import { UserTemp } from '../entity/UserTemp';

const jwt = jsonwebtoken;

/* let users: User[] = [];
const admin: User = {
    username: `tomik`, 
    password: '$2b$10$spqbiwkoTD3OUis.zB0oauJOCBAzU5VHX73nnWMPzZnE0uEZCykXu', 
    role: `ADMIN`
}

addAdmin(users,admin); */

const router = express.Router();

router.post('/login',loginUser);

router.post(`/registration`, authentication, registerUser);

router.get('/allUsers',authentication,getAllUsers);

router.get(`/logout`,authentication, logoutUser);

router.get('/getAdmin', getAdmin);

export =  router;