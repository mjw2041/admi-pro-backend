const { response } = require('express');

const getMedicos = async( req, res = response) => {
    const Medico = require('../models/medicos.models');

    const medicos = await Medico.find()
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
    res.json({
        ok:true,         
        medicos,        
    })
}


const crearMedico = async ( req, res = response) => {

    const uid = req.uid;
    
    const medico = new Medico ( {               
        usuario: uid,
        ...req.body 
    });
        
    try {
            const medicolDB = await medico.save();
            res.json({
                ok: true,
                msg: medicolDB
        
            })
             
        } catch(error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'                
            })
        }    
}

const actualizarMedico = ( req, res = response) => {
    res.json({
        ok:true,
        msg: 'actualizarMedico'

    })
}

const borrarMedico = ( req, res = response) => {
    res.json({
        ok:true,
        msg: 'borrarMedico'

    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
    
}