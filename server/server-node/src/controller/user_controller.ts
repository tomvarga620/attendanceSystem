import { NextFunction, Request, Response } from "express";
import { getConnection, Not, Repository, UpdateResult } from "typeorm";
import { Role } from "../entity/Role";
import { User } from "../entity/User";
import bcrypt from 'bcrypt';
import { SupervisorToUserRelation } from "../entity/SupervisorToUserRelation";
import { Roles } from "../helpers/Roles";

const moment = require('moment');
const getEntityRepository = (entity:any): Repository<any> => {
    return getConnection().getRepository(entity);
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const username = req.body.username;
    const supervisorId = req.body.supervisorId;

    const userNameConflict: boolean = await getEntityRepository(User)
    .createQueryBuilder("user")
    .where("user.username = :username", { username }).getCount() > 0;

    if(!userNameConflict){
        try{
            const role = new Role();
            role.roleName = req.body.role;
            role.creationTime =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            await getConnection().manager.save(role);

            const userToSave = new User();
            userToSave.username = username;
            userToSave.password = await bcrypt.hash(req.body.password, 8);
            userToSave.role = role;
            userToSave.creationTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            await getConnection().manager.save(userToSave).then((user) => {
                const superToUserRelation = new SupervisorToUserRelation();
                superToUserRelation.supervisorId = supervisorId;
                superToUserRelation.userId = user.id;
                getConnection().manager.save(superToUserRelation).then(() => {
                    res.status(201).send("User created");
                })
            })
        } catch(err){
            console.log(err);
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
    .then(userInfo => res.status(200).send(JSON.stringify(userInfo)))
    .catch(err => res.status(500).send({ err }));
}

export const getAllUsersBySupervisorId = async (req: Request, res: Response, next: NextFunction) => {

    const _supervisorId = req.body.supervisorId;
    if (_supervisorId === null)  return res.status(400).send("Invalid supervisorId");

    try {

        await getEntityRepository(SupervisorToUserRelation)
        .createQueryBuilder("supervisor_to_user_relation")
        .where({ supervisorId: _supervisorId })
        .select(["supervisor_to_user_relation.userId"])
        .getMany().then((usersId) => {

            if(usersId.length === 0) return res.status(200).send(JSON.stringify([]));

            const arrayOfUsersId = usersId.map(x => x.userId);
            getEntityRepository(User)
            .createQueryBuilder("user")
            .where("user.id IN (:...userIds)", { userIds: arrayOfUsersId })
            .getMany()
                .then(users => res.status(200).send(JSON.stringify(users)))
                .catch(err => res.status(500).send({err}))
        });

    } catch(err){
        res.status(500).send("Server error");
    }
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

    if (userId == null){
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

export const insertSupervisor = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const role = new Role();
        role.roleName = Roles.SUPERVISOR;
        role.creationTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        await getConnection().manager.save(role);

        const user = new User();
        user.username = 'tomik';
        user.password = await bcrypt.hash('admin',8);
        user.role = role;
        user.creationTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        await getConnection().manager.save(user);
        res.status(201).send("Supervisor created");
    } catch(error) {
        console.log(error);
        res.status(500).send("Server error");
    }
}

export const getSupervisor = async (req: Request, res: Response, next: NextFunction) => {
    const role = Roles.SUPERVISOR;
    await getEntityRepository(User).findOne({
        relations: ["role"],
        where :[
            {username : "tomik"}
        ]
    }).then((admin) => {
        if(admin){
            res.send(JSON.stringify(admin));
        } else {
            res.status(404).send(`SUPERVISOR not found`);
        }
    }).catch(err => res.send({ err }))
}