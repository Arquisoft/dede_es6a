import { Console } from "console";


//Conexion a la base de datos
const mongoose = require('mongoose');

const user = 'novendoagua';//process.env.DB_USER;
const password = '0otLMkCQhT7YXtZB';//process.env.DB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.pebnb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })  //Hace que no se muestre info en la consola
    .then(() => console.log('Base de datos conectada'))
    .catch((e: any) => console.log(e))
