const path = require('path');
const fs = require('fs');

const { response } = require("express");
const {v4: uuidv4} = require("uuid");

const { actualizarImagen} = require("../helpers/actualizarImagen.helpers")





const fileUpload = ( req, res = response) => {
    const tipo = req.params.tipo;
    const id   = req.params.id;

    
    // Valido si se recibio un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se envio imagen'
        });
    }
    
    /// validad tipo 
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if ( !tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital (tipo)'
        })
    }


    /// Procesar la imagen
    const file = req.files.imagen;
    
    const nombreCortado = file.name.split('.');
    const extesionArchivo = nombreCortado[ nombreCortado.length-1];
    console.log(extesionArchivo);

    /// Valirar Extesiones 
    const extesionesValidas = ['gif', 'png', 'jpeg', 'jpg'];

    if ( !extesionesValidas.includes(extesionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extesionValida'
        })
    }

    // Genero el nombre unico
    const nombreArchivo = `${uuidv4()}.${ extesionArchivo}`;

    // Path para guardar la imagen
    const path = `./uploads/${tipo}/${ nombreArchivo}`;


    // Mover el archivo
    file.mv(path, (err) => {
        if (err) {
            console.log(err);        
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });        
        }
        
            res.json ({        
                ok:true,
                nombreArchivo
            });  
    });

    // Actualizar Imagen
    actualizarImagen( tipo, id, nombreArchivo);
}


const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    console.log('__dirname', __dirname);

    console.log(`./uploads/ ${ tipo }/${ foto }`);


    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    
    if ( fs.existsSync(pathImg)) {
        res.sendFile( pathImg );

    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }
}

module.exports = {
    fileUpload,   
    retornaImagen 
}