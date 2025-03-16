require("dotenv").config();

module.exports = {
    usuarios: process.env.USUARIOS_SERVICE || "http://usuarios_service:3001",
    pagos: process.env.PAGOS_SERVICE || "http://pagos_service:3002",
    reservas: process.env.RESERVAS_SERVICE || "http://reservas_service:3003",
    inventario: process.env.INVENTARIO_SERVICE || "http://inventario_service:3004"
};
