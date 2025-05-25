const connectDB = require('./config/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear un servidor con express
const app = express();

// Conexión a base de datos
connectDB();

// Configurar middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Importar rutas
const authRoutes = require('./router/auth.router');
const solicitudRoutes = require('./router/solicitud.router'); // ✅ NUEVA

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes); // ✅ NUEVA

app.get("/", (req, res) => {
  res.send("🚀 Backend de LimpiApp funcionando");
});


module.exports = app;
