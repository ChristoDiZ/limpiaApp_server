const express = require("express");
const router = express.Router();
const Solicitud = require("../models/solicitud.model");
const auth = require("../middleware/auth.middleware"); // si tienes un middleware de autenticación

// Crear solicitud
router.post("/", auth, async (req, res) => {
  const { direccion, coords, tipo, fecha } = req.body;
  const userId = req.user.id;

  try {
    const solicitud = new Solicitud({
      user: userId,
      direccion,
      coords,
      tipo,
      fecha
    });

    await solicitud.save();
    res.status(201).json({ msg: "Solicitud creada", solicitud });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al crear la solicitud" });
  }
});

module.exports = router;
