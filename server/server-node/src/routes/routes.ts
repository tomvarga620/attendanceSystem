import express from 'express'
import { authentication } from "./adminAuthentication";
import { getAdmin, getAllUsers, insertAdmin, loginUser, logoutUser, registerUser } from '../controller/user_controller';

/* let users: User[] = [];
const admin: User = {
    username: `tomik`, 
    password: '$2b$10$spqbiwkoTD3OUis.zB0oauJOCBAzU5VHX73nnWMPzZnE0uEZCykXu', 
    role: `ADMIN`
}
addAdmin(users,admin); */

const router = express.Router();

router.post('/login',loginUser);

router.post('/registration', authentication, registerUser);

router.get('/allUsers',authentication,getAllUsers);

router.get('/logout',authentication, logoutUser);

router.post('/saveAdmin',insertAdmin);

router.get('/getAdmin', getAdmin);

export =  router;