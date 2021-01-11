import { AttendanceRecord } from './../entity/AttendanceRecord';
import { NextFunction, Request, Response } from "express";
import { getConnection, Repository, UpdateResult } from "typeorm";
import { User } from "../entity/User";

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const insertAttendanceRecord = async (req: Request, res: Response, next: NextFunction) => {

    if(Object.keys(req.body).length === 0) return res.status(400).send();

    const user = await getEntityRepository(User).findOne({
        relations: ["role"],
        where :[
            {id : req.body.id}
        ]
    });

    if (user === null || typeof user === "undefined") return res.status(404).send("User not found")

    try {
        const attendanceToSave = new AttendanceRecord();
        attendanceToSave.task = req.body.task;
        attendanceToSave.period = req.body.period;
        attendanceToSave.worktime = req.body.worktime;
        attendanceToSave.creationTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        await getConnection().manager.save(attendanceToSave);

        user.attendanceRecords = [ attendanceToSave ];
        await getConnection().manager.save(user);
        res.status(200).send("Record was saved");
    } catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }
}

export const getAllAttendanceRecordsByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id
    if(userId === null) return res.status(400).send();

    try {
        await getEntityRepository(AttendanceRecord).find({})
            .then((attendanceRecords => {
                res.status(200).send(JSON.stringify(attendanceRecords));
            }))
            .catch((err) => res.status(500).send(err))
            
    } catch(e) {
        res.status(500).send("Server error")
    }
}

export const getAttendanceRecordById = async (req: Request, res: Response, next: NextFunction) => {

    const attendanceRecordId = req.params.id
    if(attendanceRecordId === null) return res.status(400).send();

    try {
        await getEntityRepository(AttendanceRecord).find({
            where : [{ id: attendanceRecordId }]
        })
            .then((attendanceRecords => {
                res.status(200).send(JSON.stringify(attendanceRecords));
            }))
            .catch((err) => res.status(500).send(err))
            
    } catch(e) {
        res.status(500).send("Server error")
    }
}

export const deleteAttendanceRecord = async (req: Request, res: Response, next: NextFunction) => { 

    const attendanceRecordId = req.params.id

    if (attendanceRecordId == null){
        return res.status(400).send("Invalid attendanceRecordId id");
    }

    let userToRemove = await getEntityRepository(AttendanceRecord).findOne(attendanceRecordId);
    if (userToRemove == null){
        return res.status(404).send("Attendance Record not found");
    }
    
    await getEntityRepository(AttendanceRecord).delete(userToRemove)    
    .then(() => res.status(200).send("Attendance Record was successfuly deleted"))
    .catch(() => res.status(500).send("Server error"));
}

export const updateAttendanceRecord = async (req: Request, res: Response, next: NextFunction) => { 
    const attendanceRecord = {
        id: req.body.id,
        task: req.body.task,
        worktime: req.body.worktime,
        period: req.body.period
    }

    try {
        const updateResult: UpdateResult = await getEntityRepository(AttendanceRecord).update(attendanceRecord.id, attendanceRecord)
        if(updateResult.affected! == 0){
            return res.status(404).send("Attendance Record not found");
        } else {
            res.status(200).send("Attendance Record was successfuly updated");
        }
    } catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}