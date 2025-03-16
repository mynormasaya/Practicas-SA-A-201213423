const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const services = require("../config/services.js");

const router = express.Router();

// Middleware para verificar que las solicitudes llegan al API Gateway
router.use((req, res, next) => {
    console.log(`🔹 API Gateway recibió: ${req.method} ${req.originalUrl}`);
    next();
});

// Usuarios
router.use("/api/usuarios", createProxyMiddleware({ 
    target: services.usuarios, 
    changeOrigin: true,
    pathRewrite: { "^/api/usuarios/?$": "/api/usuarios" },
    logLevel: "debug"
}));


// Pagos
router.use("/api/pagos", createProxyMiddleware({ 
    target: services.pagos, 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        console.log(`➡️ Redirigiendo a ${services.pagos}`);
    }
}));

// Reservas
router.use("/api/reservas", createProxyMiddleware({ 
    target: services.reservas, 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        console.log(`➡️ Redirigiendo a ${services.reservas}`);
    }
}));

// Inventario
router.use("/api/inventario", createProxyMiddleware({ 
    target: services.inventario, 
    changeOrigin: true,
    onProxyReq: (proxyReq, req) => {
        console.log(`➡️ Redirigiendo a ${services.inventario}`);
    }
}));

module.exports = router;
