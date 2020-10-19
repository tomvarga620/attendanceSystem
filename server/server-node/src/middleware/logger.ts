import express, { NextFunction } from 'express'

export const logger = (request: express.Request, response: express.Response, next: NextFunction) => {
    console.log(`${request.method} ${request.path} ${response}`);
}