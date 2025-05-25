require('dotenv').config()
const app=require('./app.js')

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Servidor esta en ejecucion ${PORT}`)
})