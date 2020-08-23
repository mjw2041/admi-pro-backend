const { response } = require('express');

const Hospital = require('../models/hospital.models');
const { validarJWT } = require('../middlewares/validar-jwt.middlewares');

/*
const getHospitales = ( req, res = response) => {
    res.json({
        ok:true,
        msg: 'getHospitales'

    })
}
*/

const getHospitales = async (req, res = response) => {   
    
    const hospitales = await Hospital.find().
                    populate('usuario', 'nombre img')
    res.json({
        ok:true, 
        msg: 'Devolviendo Hospitales',
        hospitales,        
    })
};  

const crearHospital = async ( req, res = response) => {

    const uid = req.uid;
    
    const hospital = new Hospital( {
        usuario: uid,
        ...req.body 
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            msg: hospitalDB
    
        })
         
    } catch(error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}

const actualizarHospital = async ( req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;
    console.log(req);
    try {
        
        const hospital = await Hospital.findById ( id);
        if ( !hospital) {
            return res.status(400).json ({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }
        
        /* Forma Simple */
        /* hospital.nombre = req.body.nombre; */

        /* Form Compleja */
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate ( id, cambiosHospital, { new: true});

        res.json({
            ok:true,            
            hospital: hospitalActualizado
    
        })
        
    } catch (error) {

        console.log ( error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarHospital = async ( req, res = response) => {
    const id = req.params.id;
    
    try {
        
        const hospital = await Hospital.findById ( id);
        if ( !hospital) {
            return res.status(400).json ({
                ok: true,
                msg: 'Hospital no encontrado por id'
            })
        }
        
        await Hospital.findByIdAndDelete( id);

        res.json({
            ok:true,            
            msg: 'Hospital Eliminado'
    
        });
        
    } catch (error) {

        console.log ( error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


    res.json({
        ok:true,
        msg: 'borrarHospital'

    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
    
}