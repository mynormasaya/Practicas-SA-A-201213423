const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./src/config/db.js");
const usuarioRoutes = require("./src/routes/userRoutes.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());  // ✅ Asegura que Express pueda leer JSON correctamente
app.use(express.urlencoded({ extended: true })); // ✅ Para manejar formularios URL-encoded

app.use("/api/usuarios", usuarioRoutes);

// Conectar a la base de datos
sequelize.sync().then(() => console.log("🟢 Base de datos conectada"));

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Microservicio de Usuarios corriendo en http://localhost:${PORT}`);
});
