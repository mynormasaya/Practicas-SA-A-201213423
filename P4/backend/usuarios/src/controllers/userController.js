const Usuario = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, telefono, rol } = req.body;

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) return res.status(400).json({ mensaje: "El usuario ya existe." });

        // Hashear la contraseña antes de guardarla
        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({ nombre, email, password: passwordHash, telefono, rol });

        res.status(201).json({ mensaje: "Usuario registrado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseña con bcrypt
        const passwordMatch = await bcrypt.compare(password, usuario.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ mensaje: "Login exitoso", token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
