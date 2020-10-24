const { response } = require('express');

const Medico = require('../models/medicos.models');
const Hospital = require('../models/hospital.models');

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

const actualizarMedico = async ( req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;
    
    const idHospital = req.body.hospital;    

    try {
        
        const medico = await Medico.findById ( id);
        if ( !medico) {
            return res.status(400).json ({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }
        
        const hospital = await Hospital.findById ( idHospital);
        if ( !hospital) {
            return res.status(400).json ({
                ok: true,
                msg: 'hospital no encontrado por id'
            })
        }
        
        
        /* Form Compleja */
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate ( id, cambiosMedico, { new: true});

        res.json({
            ok:true,                        
            medico: medicoActualizado,            
        })
        
    } catch (error) {

        console.log ( error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }    
}

const borrarMedico =  async ( req, res = response) => {

    const id = req.params.id;
             
    try {
        console.log(id)
        const medico = await Medico.findById ( id);
        if ( !medico) {
            return res.status(400).json ({
                ok: true,
                msg: 'Medico no encontrado por id'
            })
        }
        console.log('Lo quiero Borrar' + id );            
        await Medico.findByIdAndDelete ( id );

        res.json({
            ok:true,                        
            medico: "Medico Eliminado Correctamente"            
        })
        
    } catch (error) {

        console.log ( error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const getMedicoById = async( req, res = response) => {
    
    const id = req.params.id;
    
    try {
        const medico = await Medico.findById( id)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
        res.json({
            ok:true,         
            medico,        
        })
        
    } catch (error) {
        res.json({
            ok:true,         
            msg:' Medico no Encontrado',        
        })
    }
    
}
        
module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById            
}