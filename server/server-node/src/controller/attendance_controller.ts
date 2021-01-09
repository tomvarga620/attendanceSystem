import { NextFunction, Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/User";
import { AttendanceRecord } from "../entity/AttendanceRecord";

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const insertAttendanceRecord = async (req: Request, res: Response, next: NextFunction) => {

    if(Object.keys(req.body).length === 0) return res.status(400).send();

    const user =  await getEntityRepository(User).findOne({
        relations: ["role"],
        where :[
            {id : req.body.id}
        ]
    });

    try {
        const attendanceToSave = new AttendanceRecord();
        attendanceToSave.worktime = req.body.worktime;
        attendanceToSave.task = req.body.task;
        attendanceToSave.creationTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        await getConnection().manager.save(attendanceToSave);

        user.attendanceRecords = [ attendanceToSave ];
        await getConnection().manager.save(user);
    } catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }

    res.status(200).send("Record was saved");
    
}