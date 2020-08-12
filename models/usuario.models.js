const { Schema, model} = require ('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: true        
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        requiered: true
    },

    img: {
        type: String,
        
    },

    role: {
        type: String,
        requiered: true,
        default: 'USER_ROLE'
    },

    google: {
        type: Boolean,
        default: false
    }
    
});

UsuarioSchema.method('toJSON', function() {
    const{ __v ,_id, password,...object} = this.toObject();
   
    object.identicador = _id; 

    return object;
}
)

module.exports = model('Usuario', UsuarioSchema);