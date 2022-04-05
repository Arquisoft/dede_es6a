import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./api"; 
import 'reflect-metadata';

// inicializacion y configuraciones
const dotenv = require('dotenv');
dotenv.config('.env');


const app: Application = express();
app.set('port', process.env.RESTAPI_DB_PORT || 5000);
const databse = require('./database');

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000'],
  optionsSuccessStatus: 200
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

//app.use(cors(options));
app.use(cors());
app.use(bp.json());

app.use("/api", api);

app.listen(app.get('port'), ():void => {
    console.log('Restapi listening on '+ app.get('port'));
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
}); 