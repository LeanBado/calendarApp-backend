const {response} = require("express")
const Evento = require('../models/evento')


const getEventos = async(req, res = response)=> {

    mostrarEventos = await Evento.find().populate('user', 'name email')
    console.log(mostrarEventos)
    res.json({
        ok:true,
       mostrarEventos
    })
}


const crearEvento = async (req, res = response)=> {

   const evento = new Evento(req.body)
  

   try {
        evento.user = req.uid
       const eventoGuardado = await evento.save()
       res.json({
        ok: true,
        evento: eventoGuardado
       })

    } catch (error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg: 'hable con el administrador'
    })
   }
}


const actualizarEvento = async(req, res = response)=> {

    const eventoId = req.params.id

    try {
        const evento = await Evento.findById(eventoId)
        if (!evento){
            return res.status(404).json({
                ok: false,
                msg: 'con ese ID no existe evento en la BD'
            })
        }

        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'el usuario no tiene privilegio de editar este evento'
            })
        }

        const newEvento = {
            ...req.body,
            user: req.uid
        } 
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, newEvento, {new: true})
                                                                                    //esta ultima opcion permite
                                                                                    //que se actualice no solamente en mongoDB
                                                                                    //sino tambien cuando muestra el body el postman


        res.json({
            ok:true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}


const eliminarEvento = async(req, res = response)=> {

    const eventoId = req.params.id

    try {
        const evento = await Evento.findById(eventoId)
        if (!evento){
           return res.status(404).json({
                ok: false,
                msg: 'con ese ID no existe evento en la BD'
            })
        }

        if(evento.user.toString() !== req.uid){
           return res.status(401).json({
                ok: false,
                msg: 'el usuario no tiene privilegio de borrar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId)
                                                                                    //esta ultima opcion permite
                                                                                    //que se actualice no solamente en mongoDB
                                                                                    //sino tambien cuando muestra el body el postman


        res.json({
            ok:true,
            msg: 'borrado realizado',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

    
    res.json({
        ok:true,
        msg: 'eliminarEvento'
    })
}


module.exports = {
    getEventos, 
    crearEvento, 
    actualizarEvento, 
    eliminarEvento
}
