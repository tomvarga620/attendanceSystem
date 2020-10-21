import { NextFunction, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { UserTemp } from "../entity/UserTemp";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken;

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const user = await getConnection()
    .getRepository(UserTemp)
    .createQueryBuilder("user_temp")
    .where("user_temp.username = :username", {username})
    .getOne();

    if(user == null){
        return res.status(400).send(`User not found`);
    }
    try {
        console.log(req.body.password);
        console.log(user.password);
        console.log(bcrypt.compare(req.body.password, user.password));
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(user.username,process.env.ACCESS_TOKEN_SECRET ?? '' );

            res.json({ token: accessToken, role: user.role}).status(200).send(`Success`);
        } else {
            res.status(401).send(`Not Allowed`);
        }
    } catch {
        res.status(500).send();
    }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    
    const userToSave = await getConnection().getRepository(UserTemp).create({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 11),
        role: req.body.role
    });

    await getConnection()
    .getRepository(UserTemp)
    .save(userToSave)
    .then((result) => {
        console.log(result);
        res.status(201).send();
    }).catch((err) => {
        res.status(500).send({ err });
    })
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const result = await getConnection()
    .getRepository(UserTemp)
    .createQueryBuilder("user_temp")
    .getMany().then((users) => {
        res.send(JSON.stringify(users));
    }).catch(err => res.send({ err }))
}

//TODO tu ptm normalne pozriet či sedi token v zázname abo čo
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query.token;
    if(token){
        res.status(200).send();
    }else {
        res.status(400).send();
    }
}

export const getAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const role = `admin`;
    await getConnection()
    .getRepository(UserTemp)
    .createQueryBuilder("user_temp")
    .where("user_temp.role = :role", {role})
    .getOne().then((admin) => {
        if(admin){
            res.send(JSON.stringify(admin));
        }else {
            res.status(404).send(`Admin not found`);
        }
    }).catch(err => res.send({ err }))
}