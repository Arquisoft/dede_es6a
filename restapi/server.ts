import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import promBundle from 'express-prom-bundle';
import api from "./controllers/api"; 

const app: Application = express();
const port: number = 5000;

//Conexion a la base de datos
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.pebnb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }  //Hace que no se muestre info en la consola
)
    .then(() => console.log('Base de datos conectada'))
   // .catch(e => console.log(e))


const options: cors.CorsOptions = {
  origin: ['http://localhost:3000/']
};

const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);

app.use(cors(options));
app.use(bp.json());

app.use("/api", api)

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
});