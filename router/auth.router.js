const express= require('express')
const router=express.Router()
const AuthController=require('../controller/auth.controller.js')



//mis rutas
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


module.exports=router


