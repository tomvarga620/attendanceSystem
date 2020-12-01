import { NextFunction, Request, Response } from "express";
import { getConnection, Repository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'
import { Role } from "../entity/Role";
import { AttendanceRecord } from "../entity/AttendanceRecord";

const jwt = jsonwebtoken;
const moment = require('moment');

const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getEntityRepository(User).findOne({
        where: [
            { username: req.body.username }
        ], 
        relations: ["role"]
    })

    if(user == null){
        return res.status(400).send(`User not found`);
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const username = user.username
            const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET ?? '' , { 
                //expiresIn: "5s"
             });
            return res.json({ token: accessToken, role: user.role.roleName}).status(200).send(`Success`);
        } else {
            return res.status(401).send(`Not Allowed`);
        }
    } catch(e) {
        // console.log(e);
        res.status(500).send();
    }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    const username = req.body.username;

    const userNameConflict: boolean = await getEntityRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username }).getCount() > 0;

    if(!userNameConflict){
        try{
            const role = new Role();
            role.roleName = req.body.role;
            await getConnection().manager.save(role);
            const userToSave = new User();
            userToSave.username = req.body.username;
            userToSave.password = await bcrypt.hash(req.body.password, 8);
            userToSave.role = role;
            await getConnection().manager.save(userToSave).then(() => res.status(201).send());
        } catch(err){
            res.status(500).send();
        }
    } else {
        res.status(409).send();
    }
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    await getEntityRepository(User).find({
        where: [
            { username: req.body.username }
        ], 
        relations: ["role"]
    }).then(userInfo => res.send(JSON.stringify(userInfo)))
    .catch(err => res.send({ err }).status(500));
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    await getEntityRepository(User).find({
        relations: ["role"]
    }).then((users) => {
        res.send(JSON.stringify(users)).status(200);
    }).catch(err => res.send({err}).status(500));
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    console.log(token);
    if(token){
        res.status(200).send();
    } else {
        res.status(400).send();
    }
}

export const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role = `ADMIN`;
    await getEntityRepository(User).findOne({
        relations: ["role"],
        where :[
            {username : "tomik"}
        ]
    }).then((admin) => {
        if(admin){
            res.send(JSON.stringify(admin));
        } else {
            res.status(404).send(`Admin not found`);
        }
    }).catch(err => res.send({ err }))
}

export const insertAdmin = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const role = new Role();
        role.roleName = `ADMIN`;
        await getConnection().manager.save(role);

        const user = new User();
        user.username = `tomik`;
        user.password = await bcrypt.hash('admin',8);
        user.role = role;
        await getConnection().manager.save(user);
        res.status(201).send();
    } catch(error) {
        console.log(error);
        res.status(500).send();
    }
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

    console.log(user);

    try {
        const attendanceTest = new AttendanceRecord();
        attendanceTest.arrivalTime = mysqlTimestamp;
        await getConnection().manager.save(attendanceTest);

        user.attendanceRecords = [ attendanceTest ];
        await getConnection().manager.save(user);
    } catch(e) {
        console.log(e);
        res.status(500).send();
    }

    res.status(200).send();

}