import { NextFunction, Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/User";
import { AttendanceRecord } from "../entity/AttendanceRecord";

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const insertAttendanceRecord = async (req: Request, res: Response, next: NextFunction) => {
    var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.log(mysqlTimestamp);

    const user =  await getEntityRepository(User).findOne({
        relations: ["role"],
        where :[
            {username : req.body.username}
        ]
    });

    try {
        const attendanceTest = new AttendanceRecord();
        attendanceTest.creationTime = mysqlTimestamp;
        await getConnection().manager.save(attendanceTest);

        user.attendanceRecords = [ attendanceTest ];
        await getConnection().manager.save(user);
    } catch(e) {
        console.log(e);
        res.status(500).send("Server error");
    }

    res.status(200).send("Record was saved");
    
}