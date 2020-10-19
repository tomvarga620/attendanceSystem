import express from 'express
import dotenv from 'dotenv';
import { resolve } from 'path';
import { options } from './config/options';
import cors from 'cors';
import router from './routes/routes';

dotenv.config({ path: resolve(__dirname, ".env") });
const app = express()

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors(options));

app.use('/',router);

app.listen(3000); 