import { NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken;

export const authentication = (req: any, res:any, next: NextFunction) => {
    const authHeader = req.headers[`authorizations`];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(`401`);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? '', (err: any, user: any) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}