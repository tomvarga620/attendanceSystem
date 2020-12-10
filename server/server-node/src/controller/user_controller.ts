import { NextFunction, Request, Response } from "express";
import { getConnection, Not, Repository } from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    await getEntityRepository(User).find({
        where: [
            { username: req.body.username }
        ], 
        relations: ["role"]
    })
    .then(userInfo => res.send(JSON.stringify(userInfo)))
    .catch(err => res.send({ err }).status(500));
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    await getEntityRepository(User).find({
        where: [
            { id: Not(id) }
        ],
        relations: ["role"]
    }).then((users) => {
        res.send(JSON.stringify(users)).status(200);
    }).catch(err => res.send({err}).status(500));
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
        res.status(201).send("Admin created");
    } catch(error) {
        console.log(error);
        res.status(500).send("Server error");
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