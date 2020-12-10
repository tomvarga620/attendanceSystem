import express from 'express'
import { authentication } from "./adminAuthentication";
import { loginUser, logoutUser, registerUser } from '../controller/account_controller';
import { getAdmin, getAllUsers, getUserInfo, insertAdmin } from '../controller/user_controller';
import { insertAttendanceRecord } from '../controller/attendance_controller';

const router = express.Router();

router.post('/login',loginUser);

router.post('/registration', authentication, registerUser);

router.post('/userInfo',getUserInfo);

router.post('/allUsers',getAllUsers);

router.get('/logout', logoutUser);

router.post('/saveAdmin',insertAdmin);

router.get('/getAdmin', getAdmin);

router.post('/saveAttendance',insertAttendanceRecord);

export = router;