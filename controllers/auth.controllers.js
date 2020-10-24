const { response} = require('express');
const bcrypt = require ('bcryptjs');
const Usuario = require('../models/usuario.models' );

const {generarJWT} = require('../helpers/jwt.helpers');
const { googleVerify } = require('../helpers/google-verify');
/*  
   funcion que contorla el login
*/
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

const  googleSignIn = async ( req, res = response ) => {

    const googleToken = req.body.token;

    try {        
       const { name, email, picture } = await googleVerify( googleToken );        

       const usuarioDB = await Usuario.findOne ({ email });

       if ( !usuarioDB) {
          /// Si el usuario no existe lo creo 
          usuario = new Usuario( {
              nombre: name,
              email, 
              password: '@@@',
              img: picture,
              gooogle: true
          }) 
       } else {
           // existe usuario
           usuario = usuarioDB,
           usuario.google = true
           usuario.password = '@@@'
       }

       /// guardar usuario en base
       await usuario.save();

       const token = await generarJWT(usuario.id);  

        res.json ({
            ok:true,
            msg: 'GoogleSign Ok v2',
            name,
            email,    
            picture,
            token      
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg:'Token Invalido'
        });
        
    }
}

const renewToken = async ( req, res = response) => {
    
    const uid = req.uid;
    // Generar el Token JWT
    const token = await generarJWT(uid)    
    
    const usuario = await Usuario.findById( uid);
    
    console.log( uid);
    
    res.json( {
        ok: true,
        token,
        usuario
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}