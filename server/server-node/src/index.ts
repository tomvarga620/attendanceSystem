import express ,{ NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import { resolve } from 'path';
import { options } from './config/options';
import cors from 'cors';
import router from './routes/routes';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import {logger} from './middleware/customLogger'

dotenv.config({ path: resolve(__dirname, ".env") });
const moment = require('moment');
var winston = require('winston'),
    expressWinston = require('express-winston');

createConnection().then(async connection => {

    const app = express()

    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
    app.use(cors(options));

    app.use(expressWinston.logger({
        transports: [
          new winston.transports.File({ 
              filename: 'combined.log' ,
              json: true,
          }),
          new winston.transports.Console({
            json: true,
            colorize: true
          })
        ]
    }));

    app.use('/',router);

    app.use(expressWinston.errorLogger({
        transports: [
          new winston.transports.File({ 
              filename: 'error.log' ,
              json: true,
          }),
          new winston.transports.Console({
              json: true,
              colorize: true
          })
        ]
    }));

    app.listen(process.env.PORT); 
});