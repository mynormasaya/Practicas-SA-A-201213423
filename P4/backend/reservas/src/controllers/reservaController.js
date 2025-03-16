const Reserva = require("../models/reservaModel.js");

exports.crearReserva = async (req, res) => {
    try {
        const { usuario_id, clase_id, fecha_reserva } = req.body;

        const nuevaReserva = await Reserva.create({ usuario_id, clase_id, fecha_reserva });

        res.status(201).json({ mensaje: "Reserva creada exitosamente", reserva: nuevaReserva });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

exports.obtenerReservasUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;

        const reservas = await Reserva.findAll({ where: { usuario_id } });

        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};
