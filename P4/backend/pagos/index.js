const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");
const sequelize = require("./src/config/db.js");
const pagoRoutes = require("./src/routes/pagoRoutes.js");

dotenv.config();

fastify.register(pagoRoutes);

// Conectar a la base de datos
sequelize.sync().then(() => console.log("🟢 Base de datos conectada"));

// Levantar servidor
fastify.listen({ port: process.env.PORT, host: '0.0.0.0' }, (err) => {
    if (err) throw err;
    console.log(`🚀 Microservicio de Pagos corriendo en http://localhost:${process.env.PORT}`);
});

