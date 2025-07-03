const connectDB = require('./config/db.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Conexión a base de datos
connectDB();

// ✅ CORS manual para evitar errores con el frontend local
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // o 5173 si usas Vite
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
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
app.get("/", (req, res) => {
  res.send("🚀 Backend de LimpiApp funcionando");
});

module.exports = app;
