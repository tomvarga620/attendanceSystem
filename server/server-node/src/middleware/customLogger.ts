/* import express, { NextFunction } from 'express'

export const logger = (request: express.Request, response: express.Response, next: NextFunction) => {
    console.log(`${request.method} ${request.path} ${response}`);
} */

import { NextFunction } from 'express';
import {
    createLogger,
    Logger as WinstonLogger,
    transports,
    format,
} from 'winston';

const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
};

const logger = winston.createLogger(logConfiguration);

export const logRequest = (request: Request, response: Response, next: NextFunction) => {
    logger.info(`${request.url}, ${response.status}`);
    next();
}

export const logError = (err: any,req: Request, res: Response, next: NextFunction) => { 
    logger.error(err)
    next()
}

module.exports = logger;