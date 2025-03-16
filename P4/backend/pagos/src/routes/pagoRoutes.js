const pagoController = require("../controllers/pagoController.js");

async function routes(fastify, options) {
    fastify.get("/", async (request, reply) => {
        return { servicio: "Pagos", estado: "Activo" };
    });
    fastify.post("/pagos", pagoController.crearPago);
    fastify.get("/pagos/:usuario_id", pagoController.obtenerPagosUsuario);
}

module.exports = routes;
