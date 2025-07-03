const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth.controller.js');

// Rutas de autenticación
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
