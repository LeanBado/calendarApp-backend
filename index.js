const express = require("express");
require('dotenv').config()
const {dbConnection} = require('./database/config')
const cors = require('cors')

//servidor express
const app = express()

//base de datos = DB
dbConnection()

//cors
app.use(cors())


//directorio publico
app.use(express.static('public'))

//lectura y parseo del body
app.use(express.json())

//rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))





// escuchar peticiones
const puerto = process.env.PORT

app.listen(puerto,()=>{
    console.log(`servidor corriendo en puerto ${puerto}` )
})
