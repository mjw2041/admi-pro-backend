
/* Para correr el servidor 
   nodemon index.js
   npm run start:dev
   Mongo DB Usuario MJW2041
            Contraseña: juanca1936
   Cadena de Conexion: mongodb+srv://mjw2041:juanca1936@cluster0.lkxn2.mongodb.net/test         
*/   
require('dotenv').config();

const express  = require('express');
const cors = require('cors');

const  { dbConnection } = require('./database/config');


/// Creacion del servidor
const app = express();

/// Configurar Cors
app.use(cors());

// Base de Datos 
dbConnection();

app.get( '/', (req, res) => {
    res.json({
        ok:true, 
        msg: 'Hola Mundo'
    });    
}) 

app.listen( 1000, () => {
    console.log("Servidor corriendo en el puerto " , process.env.PORT)
})
/*
app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " , process.env.PORT)
})
*/