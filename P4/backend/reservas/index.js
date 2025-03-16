const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/config/db.js");
const reservaRoutes = require("./src/routes/reservaRoutes.js");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", reservaRoutes);

// Conectar a la base de datos
sequelize.sync().then(() => console.log("🟢 Base de datos conectada"));

// Levantar servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚀 Microservicio de Reservas corriendo en http://localhost:${PORT}`));
