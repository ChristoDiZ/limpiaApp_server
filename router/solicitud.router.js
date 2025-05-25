const express = require("express");
const router = express.Router();
const Solicitud = require("../models/solicitud.model");
const auth = require("../middleware/auth.middleware");

// ✅ Crear solicitud
router.post("/", auth, async (req, res) => {
  const { direccion, coords, tipo, fecha } = req.body;
  const userId = req.user.id;

  try {
    const solicitud = new Solicitud({
      user: userId,
      direccion,
      coords,
      tipo,
      fecha,
    });

    await solicitud.save();
    res.status(201).json({ msg: "Solicitud creada", solicitud });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al crear la solicitud" });
  }
});

// ✅ Ver todas las solicitudes pendientes (para limpiadores)
router.get("/", auth, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ estado: "pendiente" })
      .populate("user", "firstname lastname email");

    res.status(200).json(solicitudes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al obtener las solicitudes" });
  }
});

// ✅ Ver las solicitudes asignadas a este limpiador
router.get("/asignadas", auth, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ limpiador: req.user.id })
      .populate("user", "firstname lastname email");

    res.status(200).json(solicitudes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al obtener tareas asignadas" });
  }
});

// ✅ Tomar una solicitud (asignarse como limpiador)
router.put("/:id/asignar", auth, async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({ msg: "Solicitud no encontrada" });
    }

    if (solicitud.estado !== "pendiente") {
      return res.status(400).json({ msg: "Ya fue tomada por otro limpiador" });
    }

    solicitud.estado = "asignada";
    solicitud.limpiador = req.user.id;
    await solicitud.save();

    res.status(200).json({ msg: "✅ Solicitud asignada con éxito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al asignar la solicitud" });
  }
});

//✅Tarea completada
router.put("/:id/completar", auth, async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({ msg: "Solicitud no encontrada" });
    }

    if (solicitud.limpiador.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No tienes permiso para completar esta solicitud" });
    }

    solicitud.estado = "completada";
    await solicitud.save();

    res.status(200).json({ msg: "Solicitud marcada como completada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al completar la solicitud" });
  }
});
// Obtener solicitudes creadas por el usuario actual
router.get("/mis-solicitudes", auth, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find({ user: req.user.id })
      .populate("limpiador", "firstname lastname email");

    res.status(200).json(solicitudes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al obtener tus solicitudes" });
  }
});


module.exports = router;
