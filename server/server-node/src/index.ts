import express, { NextFunction } from 'express'
import dotenv from 'dotenv';
import { resolve } from 'path';
import { options } from './config/options';
import cors from 'cors';
import router from './routes/routes';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import {logger} from './middleware/customLogger'

dotenv.config({ path: resolve(__dirname, ".env") });

createConnection().then(async connection => {

    const app = express()

    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
    app.use(cors(options));

    app.use((err: any,req: any,res:any,next:any) => {
        logger.info(`${req.url}, ${res.statusCode}`);
        logger.error(`${req.url}, ${res.statusCode}`);
        next();
    });

    app.use('/',router);

    app.listen(process.env.PORT); 
});