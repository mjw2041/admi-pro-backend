const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.models');

const validarJWT = ( req, res, next) => {
    const token = req.header('x-token');

    console.log(token);

    if ( !token) {
        return res.status(401).json( {
            ok:false,
            msg: "No tiene token"
        })
    }

    try{
         const { uid } = jwt.verify( token, process.env.JWT_SECRET);    
         console.log( '*********' ); 
         console.log( uid ); 
         req.uid = uid;
         next();

    } catch ( error ){
        return res.status(401).json( {
            ok:false,
            msg: "token no valido"
        })
    }
}

const validarADMIN_ROLE = async (req, res, next ) => {
    const uid = req.uid;  /* El campo uid se llena con el Validar JWT simpre ponerlo despues */
    try {
        const usuarioDB = await Usuario.findById(uid);
        if ( !usuarioDB) {
            return res.status(404). json ({
                ok: false,
                msg: 'Usuario no Existe'
            })
        }

        if (usuarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403). json ({
                ok: false,
                msg: 'No es un ADMINISTRADOR'
            })
        }

        next();
 
    } catch (error) {
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg: 'Hable con el administrador'

        })
        
    }
}  

const validarADMIN_ROLE_o_MismoUsuario = async (req, res, next ) => {
    const uid = req.uid; 
    const id  = req.params.id; 
    try {
        const usuarioDB = await Usuario.findById(uid);
        if ( !usuarioDB) {
            return res.status(404). json ({
                ok: false,
                msg: 'Usuario no Existe'
            })
        }

        if (usuarioDB.role !== 'ADMIN_ROLE' || uid === id ) { 
            next();
    
        } else {
            return res.status(403). json ({
                ok: false,
                msg: 'No es un ADMINISTRADOR'
            })
        }          
    } catch (error) {
        console.log(error);
        res.status(500).json ({
            ok: false,
            msg: 'Hable con el administrador'

        })            
    }
}        


module.exports = {
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}