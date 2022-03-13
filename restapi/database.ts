

//Conexion a la base de datos
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Base de datos conectada'))
    .catch((e: any) => console.log(e));
