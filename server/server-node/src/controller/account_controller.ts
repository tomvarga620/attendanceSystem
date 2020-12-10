import { NextFunction, Request, Response } from "express";
import { getConnection, Not, Repository } from "typeorm";
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
    });

    if(user == null){
        return res.status(400).send(`User not found`);
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const username = user.username
            const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET ?? '' , { 
                //expiresIn: "5s"
             });
            return res.json({ token: accessToken, role: user.role.roleName, id: user.id }).status(200).send(`Success`);
        } else {
            return res.status(401).send(`Not allowed`);
        }
    } catch(e) {
        // console.log(e);
        res.status(500).send("Server error");
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
            res.status(500).send("Server error");
        }
    } else {
        res.status(409).send("Username already exist");
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    if(token){
        res.status(200).send("Logout was successful");
    } else {
        res.status(400).send();
    }
}