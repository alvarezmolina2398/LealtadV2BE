const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Configuraciones = sequelize.define('configuraciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, { timestamps: false });

// Configuraciones.sync({ alter: true }).then(() => {
//     console.log('Tabla Configuraciones creada o actualizada correctamente');
// });

module.exports = { Configuraciones };