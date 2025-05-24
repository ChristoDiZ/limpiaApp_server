const express= require('express')

const router=express.Router()
const AuthController=require('../controller/auth.controller.js')

//mis rutas
router.post('/auth/register',AuthController.register)

module.exports=router


