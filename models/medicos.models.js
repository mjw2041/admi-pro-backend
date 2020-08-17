const { Schema, model} = require ('mongoose');

const MedicoSchema = Schema ({
    nombre: {
        type: String,
        required: true        
    },

    img: {
        type: String,
        
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }

    
},{ collection: 'medicos'});
     /* Se hace para cambiar el nombre de la tabla en la Base de Dato */
MedicoSchema.method('toJSON', function() {
    const{ __v ,...object} = this.toObject();
   
    return object;
}
)

module.exports = model('Medico', MedicoSchema);