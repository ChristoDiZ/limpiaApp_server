const connectDB = require('./config/db.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Conexión a base de datos
connectDB();

// ✅ CORS mejorado: permitir múltiples orígenes (React, Vite)
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Preflight success
  }

  next();
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Importar rutas
const authRoutes = require('./router/auth.router');
const solicitudRoutes = require('./router/solicitud.router');

// Montar rutas
app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend de LimpiApp funcionando');
});

module.exports = app;
