import express from 'express'
import { authentication } from "./adminAuthentication";
import { login, logoutUser } from '../controller/account_controller';
import { createUser, deleteUser, getAdmin, getAllUsers, getUserInfo, insertAdmin, updateUser } from '../controller/user_controller';
import { insertAttendanceRecord } from '../controller/attendance_controller';

const router = express.Router();

router.post('/login',login);

router.post('/createUser', authentication, createUser);

router.post('/userInfo',getUserInfo);

router.post('/allUsers',getAllUsers);

router.get('/logout', logoutUser);

router.post('/saveAdmin',insertAdmin);

router.get('/getAdmin', getAdmin);

router.post('/saveAttendance',insertAttendanceRecord);

router.delete('/deleteUser/:id',deleteUser)

router.post('/updateUser',updateUser)

export = router;