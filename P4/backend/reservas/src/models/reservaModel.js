const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Reserva = sequelize.define("reservas", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    clase_id: { type: DataTypes.INTEGER, allowNull: false },
    estado: { 
        type: DataTypes.ENUM("pendiente", "confirmada", "cancelada"),
        defaultValue: "pendiente"
    },
    fecha_reserva: { type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: true,
    tableName: "reservas"
});

module.exports = Reserva;
