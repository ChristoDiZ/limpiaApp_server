const mongoose =require('mongoose')

const UserSchema= mongoose.Schema({
    firstname:String,
    lastname:String,
    email:{
        unique:true,
        type:String
    },
    password:String,
    active:Boolean
})

module.exports=mongoose.model("User",UserSchema)