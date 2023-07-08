const {response} = require("express")
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const {generarJWT} = require('../helpers/jwt')


const crearUsuario = async (req, res = response)=> {

    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email})

            if(usuario){
                return res.status(400).json({
                    ok: false,
                    msg: 'el usuario existe con ese correo',
                })
            }
        usuario = new Usuario(req.body)

        //encriptado de contrase;a antes del guardado de usuario:
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password,salt)

        await usuario.save()
            //generar token
        const token = await generarJWT(usuario.id, usuario.name)


        res.status(201).json({
            ok:true,
            msg: 'crea usuario',
            uid: usuario.id,
            name: usuario.name,
            token,
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error sign up'
        })
    }
    
}

const loginUsuario = async(req, res = response)=> {

    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'el usuario no existe con ese correo',
            })
        }
        const validPass = bcrypt.compareSync(password,usuario.password)
        if(!validPass){
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            })
        }
        //genera token
        const token = await generarJWT(usuario.id, usuario.name)


        res.status(202).json({
            ok:true,
            msg: 'login usuario',
            usuario: usuario.name,
            id: usuario.id,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error login'
        })
    }
}

const revalidarToken = async (req, res = response)=> {

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name)




    res.json({
        ok:true, 
        name, 
        uid,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}