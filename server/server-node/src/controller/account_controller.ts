import { NextFunction, Request, Response } from "express";
import { getConnection, Not, Repository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken;
const moment = require('moment');

const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getEntityRepository(User).findOne({
        where: [
            { username: req.body.username }
        ], 
        relations: ["role"]
    });

    if(user == null){
        return res.status(400).send("User not found");
    }

    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            const username = user.username
            const accessToken = jwt.sign({username},process.env.ACCESS_TOKEN_SECRET ?? '' , { 
                expiresIn: "1d"
            });
            return res.json({ token: accessToken, role: user.role.roleName, id: user.id }).status(200).send("Success");
        } else {
            return res.status(401).send("Not allowed");
        }
    } catch(e) {
        res.status(500).send("Server error");
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