const connectDB = require('./config/db.js')
const express =require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

//crear un servidor con express
const app= express()

//conexion a base de datos
connectDB()

//configurar cors
app.use(cors())
//configurar bodyparser
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
//configurar static folder
app.use(express.static('uploads'))
//importar rutas

//configurar rutas

module.exports=app