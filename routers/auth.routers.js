/*
    Path: api/login
*/

const { Router } = require('express');
const { login, googleSignIn, renewToken }  = require('../controllers/auth.controllers');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares/validar-campo.middlewares')
const { validarJWT } = require('../middlewares/validar-jwt.middlewares')

const router = Router();


router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    login
);

router.post('/google',
    [        
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    googleSignIn
);

router.post('/renew',
    validarJWT,
    renewToken
);

module.exports = router;
