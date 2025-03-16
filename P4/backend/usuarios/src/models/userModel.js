const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Usuario = sequelize.define("usuarios", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    telefono: { type: DataTypes.STRING },
    rol: { 
        type: DataTypes.ENUM("estudiante", "instructor", "admin"),
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "usuarios"
});

module.exports = Usuario;
