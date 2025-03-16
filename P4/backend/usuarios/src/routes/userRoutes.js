const express = require("express");
const { registrarUsuario, login } = require("../controllers/userController.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ servicio: "Usuarios", estado: "Activo" });
});
router.post("/registro", registrarUsuario);
router.post("/login", login);

module.exports = router;
