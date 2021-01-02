import { NextFunction, Request, Response } from "express";
import { getConnection, Not, ObjectID, Repository, UpdateResult } from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

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

export const updateUser = async (req: Request, res: Response, next: NextFunction) => { 
    const user = {
        id: req.body.id,
        username: req.body.username,
    }

    try {
        const updateResult: UpdateResult = await getEntityRepository(User).update(user.id, user)
        if(updateResult.affected! == 0){
            return res.status(404).send("User not found");
        } else {
            res.status(200).send("User was successfuly updated");
        }
    } catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => { 

    const userId = req.params.id

    if(userId == null){
        return res.status(400).send("Invalid user id");
    }

    let userToRemove = await getEntityRepository(User).findOne(userId);
    if (userToRemove == null){
        return res.status(404).send("User not found");
    }
    
    await getEntityRepository(User).delete(userToRemove)    
    .then(() => res.status(200).send("User was successfuly deleted"))
    .catch(() => res.status(500).send("Server error"));
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