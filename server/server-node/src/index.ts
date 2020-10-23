import express from 'express'
import dotenv from 'dotenv';
import { resolve } from 'path';
import { options } from './config/options';
import cors from 'cors';
import router from './routes/routes';
import "reflect-metadata";
import { createConnection } from 'typeorm';

dotenv.config({ path: resolve(__dirname, ".env") });

createConnection().then(async connection => {

    const app = express()

    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());
    app.use(cors(options));

    app.use('/',router);

    app.listen(process.env.PORT); 

/*     await connection.manager.save(connection.manager.create(UserTemp, {
        username: "test",
        password: "test",
        role: "test"
    }));
 */
});