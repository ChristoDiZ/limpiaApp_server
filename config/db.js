//mongoose
const mongoose =require('mongoose')
require('dotenv').config()

//conectar con la base de datos
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('La conexion con la base de datos a sido existosa✅')
    }catch(error){
        console.log('Error al conectar a la base de datos❌',error)
    }
}

module.exports=connectDB