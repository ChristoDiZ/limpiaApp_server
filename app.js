const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();

// Conexión a BD
connectDB();

// ✅ Configuración CORS
app.use(cors({
  origin: 'https://frontend-production-8b53.up.railway.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Rutas
const authRoutes = require('./router/auth.router');
const solicitudRoutes = require('./router/solicitud.router');

app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend de LimpiApp funcionando");
});

module.exports = app;
