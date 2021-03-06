
/* Para correr el servidor 
   nodemon index.js
   npm run start:dev
   Mongo DB Usuario MJW2041
            Contraseña: juanca1936
   Cadena de Conexion: mongodb+srv://mjw2041:juanca1936@cluster0.lkxn2.mongodb.net/test         
*/   
require('dotenv').config();

const path = require('path');


const express  = require('express');
const cors = require('cors');

const  { dbConnection } = require('./database/config');


/// Creacion del servidor
const app = express();


/// Configurar CORS
app.use(cors());

/// Lectura y Parso del BODY *** esto va siempre antes de la rutas
app.use(express.json());

// Base de Datos 
dbConnection();

/// Directorio Publico 
app.use(express.static('public'));

/// Rutas 
app.use('/api/usuarios', require('./routers/usuarios.routers'))
app.use('/api/hospitales', require('./routers/hospitales.routers'))
app.use('/api/medicos', require('./routers/medicos.routers'))
app.use('/api/todo', require('./routers/busquedas.routers'))
app.use('/api/login', require('./routers/auth.routers'))
app.use('/api/upload', require('./routers/uploads.routers'))

/// Lo último 
app.get ('*', ( req, res) => {
    res.sendFile ( path.resolve (__dirname, 'public/index.html') );
})



/**
 *  app.use es una mildware
 */

/**
 * Forma Tradicional  
 */

/* app.get( '/', (req, res) => {
    res.json({
        ok:true, 
        msg: 'Hola Mundo'
    });    
})

app.get( '/api/usuarios', (req, res) => {
    res.json({
        ok:true, 
        usuario: [
            { id: 123,
            nombre: 'Perret, Carolina'}
        ]
    });    
}) 
*/
app.listen( 3000, () => {
    console.log("Servidor corriendo en el puerto " , 3000)
})


/*
app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " , process.env.PORT)
})
*/