import express from 'express'
import { authentication } from "./adminAuthentication";
import { getAdmin, getAllUsers, getUserInfo, insertAdmin, insertAttendanceRecord, loginUser, logoutUser, registerUser } from '../controller/user_controller';
import { logError, logRequest } from '../middleware/customLogger';

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

router.post('/userInfo',getUserInfo);

router.get('/allUsers',getAllUsers);

router.get('/logout', logoutUser);

router.post('/saveAdmin',insertAdmin);

router.get('/getAdmin', getAdmin);

router.post('/saveAttendance',insertAttendanceRecord);

export = router;