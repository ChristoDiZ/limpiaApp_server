const connectDB = require('./config/db.js');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear un servidor con express
const app = express();

// Conexión a base de datos
connectDB();

const corsOptions = {
  origin: "https://limpi.netlify.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions)); // aplica CORS a todo

// Esto maneja explícitamente solicitudes OPTIONS para evitar errores preflight
app.options('*', cors(corsOptions));



// Middlewares adicionales
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Importar rutas
const authRoutes = require('./router/auth.router');
const solicitudRoutes = require('./router/solicitud.router');

// Configurar rutas
app.use('/api/auth', authRoutes);
app.use('/api/solicitudes', solicitudRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend de LimpiApp funcionando");
});

module.exports = app;
