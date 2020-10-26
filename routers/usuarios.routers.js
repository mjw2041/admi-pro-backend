/**
 *  Rutas: /api/usuarios
 */

const { Router } = require('express');
const { check, validationResult } = require('express-validator')

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario} = require('../controllers/usuario.controllers')

const  { validarCampos} = require('../middlewares/validar-campo.middlewares');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt.middlewares');

const router = Router();

router.get( '/', getUsuarios ); 

router.post( '/', 
  [     
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password','La contraseña es obligatoria').not().isEmpty(),
      check('email', "El mail tiene que ser valido").isEmail(),
      validarCampos

  ],
        crearUsuario ); 

router.put('/:id', 
  [
      validarJWT,
      validarADMIN_ROLE_o_MismoUsuario,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),            
      check('email', "El mail tiene que ser valido").isEmail(),
      check('role', "El role es obligatorio....").not().isEmpty(),
      validarCampos
  ],
      actualizarUsuario );

router.delete('/:id',  
          validarJWT,
          borrarUsuario );      

module.exports = router;