
const { response} = require('express')

const Usuario = require('../models/usuario.models');

const bcrypt = require ('bcryptjs');
const { generarJWT } = require('../helpers/jwt.helpers');



const getUsuarios = async (req, res) => {   

    const desde = Number(req.query.desde) || 0;
    console.log(desde);
    /**
     * Ejecucion Asincronica 
     */
    //const usuarios = await Usuario.find({}, 'nombre email role google')
    //                            .skip(desde)
    //                            .limit(5);

    // const totalUsuarios = await Usuario.count();                            

    /**
     *  Ejecucion Sincronica 
     */

     const [ usuarios , totalUsuarios]  = await Promise.all ([
        Usuario.find({}, 'nombre email role google img')
                                .skip(desde)
                                .limit(5),
        Usuario.countDocuments()
     ]);

    res.json({
        ok:true, 
        msg: 'Devolviendo Usuarios',
        usuarios,
        totalUsuarios
        /* uid: req.uid*/ 
    })
};  
const crearUsuario = async(req, res = response) => {

    /* Mostrar los valores */
    console.log(req.body);

    // Sacar los valores y ponerlo en variables o constantes */
    const{ email, password } = req.body;
/*    
    const errores = validationResult( req );
        

    if ( !errores.isEmpty() ) {
        return res.status(400).json( {
            ok:false,
            errors: errores.mapped()
        });
    }
*/    
    try {
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail) {
            return res.status(400).json({ 
                ok: false,
                msg: 'El correo ya esta ingresado'
            })
        }

        const usuario = new Usuario( req.body );

        /// Encriptar contraseña
        
        const salt = bcrypt.genSaltSync();
        
        usuario.password = bcrypt.hashSync( password, salt );
        
        
        /// Guardar usuario       
        await usuario.save();
        const token = await generarJWT(usuario.id)
        res.json({
                ok:true, 
                msg: 'Creando Usuarios',
                usuario: usuario,
                token : token 
        })

    } catch ( error) {
        console.log(error)
        res.status.json({ 
            ok: false,
            msg: "error inesperado ... revisar log"
        })
    }

};  

const actualizarUsuario = async ( req, res = response ) => {
    
    // TODO  validar token y comprobar si es el usuario correcto    
    
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid);
       
        if (  !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese UD'
            });
        } 

        /// Actualizaciones 
   
        const { password, google, email ,...campos } = req.body;
        /* Desectructuracion, sacar los campos password google. emanil del objeto */
        console.log( "******************************"); 
        console.log( "******************************", usuarioDB.email); 
        console.log( "******************************", req.body.email); 
        if  ( usuarioDB.email !==  email ) {
             const existeEmail = await Usuario.findOne ({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe Email'
    
                });     
            }    
        }        
        /* Le tengo que volver a agregar el campo email */
        if ( !usuarioDB.google ) {
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json( {
                ok: false,
                msg: 'Usuariop de Google no pueden cambiar sus mail' 
            })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});


        res.json({
            ok:true,
            usuarioActualizado
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json( {
            ok:false,
            msg: 'error inespedado'
        })
    }
}


const  borrarUsuario = async ( req, res = response ) => {
    const uid = req.params.id;    
    try{
        const usuarioDB = await Usuario.findById( uid);
        
        if (  !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese UDI'

            });
        } 

        await Usuario.findByIdAndDelete(uid);
        res.json({
             ok: true,
             msg: "usuario Eliminado"
     })} 
    catch (error) {
        console.log(error);
        res.status(500).json( {
            ok:false,
            msg: 'error inespedado'
        })
    }
}

module.exports = { 
    getUsuarios, 
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}