const { response} = require('express');
const bcrypt = require ('bcryptjs');
const Usuario = require('../models/usuario.models' );

const {generarJWT} = require('../helpers/jwt.helpers');

const login = async ( req, res = response ) => {

  const { email, password } = req.body; 
    
  try {
    
    const usuarioDB = await Usuario.findOne( { email });
    
    /// Verificar usuario 
    if ( !usuarioDB ) {
        return res.status(404).json ({
            ok:false,
            msg: "email no encontrado"
        })
    }

    /// verficar contrasena

    const validPassword = bcrypt.compareSync( password, usuarioDB.password);

    if ( !validPassword ) {
        return res.status(404).json ({
            ok:false,
            msg: "contraseña no encontrada"
        })
    }

    /// Generar un JWT
    const token = await generarJWT(usuarioDB.id);  
    
    res.json({
        ok:true,
        token
    })

  } catch ( error ) {
      console.log(error)
      res.status(400).json( {
          ok: false,
          msg: "ocurrio un error"
      } )
  }
}

module.exports = {
    login
}