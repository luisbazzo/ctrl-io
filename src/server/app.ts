import express, {Express} from "express";
import cors, {CorsOptions} from 'cors';
import morgan, {Morgan} from 'morgan';

import "reflect-metadata";

import { router } from "./routes";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/api/mensagem', (req, res) => {
    res.send({ express: 'Express funcionando'});
});