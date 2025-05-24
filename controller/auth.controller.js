const User=require('../models/user.model.js')
const bycriptjs=require('bcryptjs')
//register
async function register(req,res) {
    //obtener los datos
    const {firstname,lastname,email,password}=req.body

    //validar los datos
    if(!email)return res.status(400).send({msg:"El email es obligatorio ❌"})
    if(!password)return res.status(400).send({msg:"La contraseña es obligatorio ❌"})
    
    //crear el usuario
    const user = new User ({
        firstname:firstname.toLowerCase(),
        lastname:lastname.toLowerCase(),
        email:email.toLowerCase(),
        password:password,
        active:false
    })
    //encriptar password
    user.password=bycriptjs.hashSync(password,10)
    console.log(user)
    //guardar en la db
    try{
        await user.save()
        res.status(201).send({msg:"usuario guardado"})
    }catch(error){
        res.status(500).send({msg:"Error al crear el usuario ❌"})
        console.log(error)
    }   


    res.status(200).send({msg:"todo ok"})
}
//login

module.exports={
    register,
}