/**
 *   Rutas: /api/hospitales
 * 
 */

const { Router } = require('express');
const { check, validationResult } = require('express-validator')
const  { validarCampos } = require('../middlewares/validar-campo.middlewares');

const {  validarJWT } = require('../middlewares/validar-jwt.middlewares');

const router = Router();

const { getHospitales, crearHospital, actualizarHospital, borrarHospital} = require ('../controllers/hospitales.controllers')

router.get( '/' , getHospitales ); 

router.post( '/',         
        [   
           validarJWT,
           check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
           validarCampos
        ],

        crearHospital ); 

router.put('/:id', 
     [],
     actualizarHospital );

router.delete('/:id',            
          borrarHospital );      

module.exports = router;