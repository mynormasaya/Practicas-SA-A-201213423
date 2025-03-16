const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Pago = sequelize.define("pagos", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    monto: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    metodo_pago: { 
        type: DataTypes.ENUM("tarjeta", "efectivo", "transferencia"),
        allowNull: false
    },
    estado: { 
        type: DataTypes.ENUM("pendiente", "completado", "fallido"),
        defaultValue: "pendiente"
    }
}, {
    timestamps: true,
    tableName: "pagos"
});

module.exports = Pago;
