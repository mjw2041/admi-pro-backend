/**
 *   Rutas: /api/hospitales
 * 
 */

const { Router } = require('express');
const { check, validationResult } = require('express-validator')
const  { validarCampos } = require('../middlewares/validar-campo.middlewares');

const {  validarJWT } = require('../middlewares/validar-jwt.middlewares');

const router = Router();

/*const { getHospitales, crearHospital, actualizarHospital, borrarHospital} = require ('../controllers/hospitales.controllers')*/

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require ('../controllers/medico.controlers')

router.get( '/' , getMedicos ); 

router.post( '/', 
        [
           validarJWT,
           check('nombre', 'El nombre del medico es necesario').not().isEmpty(), 
           check('hospital', 'El ID de hospital debe ser valido').isMongoId(),
           validarCampos
        ],
        crearMedico ); 

router.put('/:id', 
     [],
     actualizarMedico );

router.delete('/:id',            
          borrarMedico );      

module.exports = router;