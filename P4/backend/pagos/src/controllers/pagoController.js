const Pago = require("../models/pagoModel.js");

exports.crearPago = async (req, reply) => {
    try {
        const { usuario_id, monto, metodo_pago } = req.body;

        const nuevoPago = await Pago.create({ usuario_id, monto, metodo_pago });

        reply.code(201).send({ mensaje: "Pago registrado exitosamente", pago: nuevoPago });
    } catch (error) {
        reply.code(500).send({ error: "Error en el servidor" });
    }
};

exports.obtenerPagosUsuario = async (req, reply) => {
    try {
        const { usuario_id } = req.params;

        const pagos = await Pago.findAll({ where: { usuario_id } });

        reply.send(pagos);
    } catch (error) {
        reply.code(500).send({ error: "Error en el servidor" });
    }
};
