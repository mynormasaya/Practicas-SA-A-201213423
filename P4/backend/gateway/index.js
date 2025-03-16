const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/gatewayRoutes.js");

const app = express();
app.use(cors());
app.use(express.json());

// Log de cada solicitud entrante
app.use((req, res, next) => {
    console.log(`✅ Solicitud recibida en el API Gateway: ${req.method} ${req.originalUrl}`);
    next();
});

// Ruta de prueba para confirmar que Express está funcionando
app.get("/", (req, res) => {
    res.json({ mensaje: "API Gateway funcionando correctamente" });
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway corriendo en http://localhost:${PORT}`);
});
