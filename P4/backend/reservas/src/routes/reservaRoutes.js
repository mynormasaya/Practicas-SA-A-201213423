const express = require("express");
const { crearReserva, obtenerReservasUsuario } = require("../controllers/reservaController.js");

const router = express.Router();
router.get("/", (req, res) => {
    res.json({ servicio: "Reservas", estado: "Activo" });
});

router.post("/reservas", crearReserva);
router.get("/reservas/:usuario_id", obtenerReservasUsuario);

module.exports = router;
