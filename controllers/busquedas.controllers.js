const { response } = require('express');

const Usuario = require('../models/usuario.models');
const Hospital = require('../models/hospital.models');
const Medico  = require('../models/medicos.models');

const getTodos = async (req, res = response) => {   
    const busqueda = req.params.busqueda;
    const expresionRegular = new RegExp ( busqueda, 'i');
    /* Sincronica */  
    /*
    const usuario  = await Usuario.find({ nombre: expresionRegular});
    const hospital = await Hospital.find({ nombre: expresionRegular});
    const medico   = await Medico.find ({ nombre: expresionRegular});
    */

    /* Asincronica (todas juntas )*/ 

    const [ usuario, hospital, medico] = await Promise.all ([ 
        Usuario.find({ nombre: expresionRegular}),
        Hospital.find({ nombre: expresionRegular}),
        Medico.find ({ nombre: expresionRegular})

    ])

    res.json({
        ok:true, 
        msg: 'getTodos',        
        usuario,
        medico,
        hospital
    })
};  


const getDocumentoColeccion = async (req, res = response) => {   
    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const expresionRegular = new RegExp ( busqueda, 'i');

    let data = [];
    console.log(tabla); 
    switch ( tabla) {
        case 'medicos':                       
            console.log('Entro usuarios'); 
            data = await Medico.find ({ nombre: expresionRegular})
                               .populate('usuario', 'nombre img')    
                               .populate('hospital', 'nombre img');    
            break;                   

        case 'usuarios':           
           console.log('Entro usuarios')

            data = await Usuario.find({ nombre: expresionRegular});                                
            break;                   
            

        case 'hospitales':
            console.log('Entro hospitales'); 
            data = await Hospital.find({ nombre: expresionRegular})   
                                 .populate('usuario', 'nombre img');                
            break;                                                    
    
        default:
            console.log('Entro error'); 
            return res.status(400).json ({
                        ok: false,
                        msg: 'La tabla tiene que ser usuario/medicos/hospitales'
                   });
        };
        
        res.json({
                    ok:true, 
                    msg: 'getTodos',        
                    data
                     })               
};  



module.exports = {
    getTodos, 
    getDocumentoColeccion   

}