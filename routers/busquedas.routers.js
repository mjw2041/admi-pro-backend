/**
 *   Rutas: /api/hospitales
 * 
 */

const { Router } = require('express');
const { check, validationResult } = require('express-validator')
const  { validarCampos } = require('../middlewares/validar-campo.middlewares');

const {  validarJWT } = require('../middlewares/validar-jwt.middlewares');
const router = Router();

const { getTodos, getDocumentoColeccion } = require ('../controllers/busquedas.controllers')

router.get( '/:busqueda',         
        [   
           validarJWT,                      
        ],

        getTodos ); 

router.get( '/coleccion/:tabla/:busqueda',         
        [   
           validarJWT,                      
        ],

        getDocumentoColeccion ); 


module.exports = router;