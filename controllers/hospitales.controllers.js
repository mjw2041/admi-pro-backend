const { response } = require('express');

const Hospital = require('../models/hospital.models');

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

const actualizarHospital = ( req, res = response) => {
    res.json({
        ok:true,
        msg: 'actualizarHospital'

    })
}

const borrarHospital = ( req, res = response) => {
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