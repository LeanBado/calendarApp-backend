const {Schema, model} = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
    
})
//sirve para modificar el body del JSON que se va creando
EventoSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject() //object = todo el contenido del body de JSON
    //extraigo __v y _id
    object.id = _id //agrego a object el 'id' con el valor de _id
    return object //devuelvo el objeto sin el __v, que lo extraje arriba
   
})

module.exports = model('Evento',EventoSchema)