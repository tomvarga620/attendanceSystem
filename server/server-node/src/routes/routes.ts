import express from 'express'
import { authentication } from "./adminAuthentication";
import { login, logoutUser } from '../controller/account_controller';
import { createUser, deleteUser, getAllUsersBySupervisorId, getSupervisor, getUserInfo, insertSupervisor, updateUser } from '../controller/user_controller';
import { insertAttendanceRecord } from '../controller/attendance_controller';

const router = express.Router();

router.post('/login',login);

router.post('/createUser', createUser);

router.post('/userInfo',getUserInfo);

router.post('/allUsers',getAllUsersBySupervisorId);

router.get('/logout', logoutUser);

router.post('/saveSupervisor',insertSupervisor);

router.get('/getSupervisor', getSupervisor);

router.post('/saveAttendance',insertAttendanceRecord);

router.delete('/deleteUser/:id',deleteUser)

router.post('/updateUser',updateUser)

export = router;