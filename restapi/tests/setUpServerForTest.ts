import path from 'path';

var dotenvPath = path.resolve('../.env');
require("dotenv").config({path: dotenvPath});

import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

export function createApp(): Application{
    let app : Application = express();
    
    const options: cors.CorsOptions = {
        origin: [process.env.CORS_OPTIONS||'http://localhost:3000']
    };

    app.use(cors(options));
    app.use(bp.json());

    return app;
}

export function createServer(app : Application): http.Server{
    const port: string = process.env.PORT||'5000';
    return app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
}

export async function loadDatabase(){
    const conexiondb: string = process.env.DB_URI!;
    await mongoose.connect(conexiondb) 
    .then(() => console.log("BD conectada"))
}

export async function closeServer(server: http.Server){
    server.close();
    try{
        await mongoose.disconnect();
    }catch{
        //
    }
}





