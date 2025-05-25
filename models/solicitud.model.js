const mongoose = require("mongoose");

const SolicitudSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  direccion: String,
  coords: {
    lat: Number,
    lng: Number
  },
  tipo: {
    type: String,
    enum: ["casa", "departamento", "oficina"],
    required: true
  },
  fecha: Date,
  estado: {
    type: String,
    enum: ["pendiente", "asignada", "completada"],
    default: "pendiente"
  },
  limpiador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  creadoEn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Solicitud", SolicitudSchema);
