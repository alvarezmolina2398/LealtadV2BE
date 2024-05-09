const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { TablaDB } = require('./tabladb');
const { Columna } = require('./columna');

const Proyectos = sequelize.define('proyectos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    descripcion: {
        type: DataTypes.TEXT('medium'),
        allowNull: true
    },

    ruta: {
        type: DataTypes.STRING(200),
        allowNull: true
    },

    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: true
    },


}, { timestamps: false });

Proyectos.hasMany(TablaDB,{
    foreignKey: 'idProyectos',
    sourceKey: 'id'
});


TablaDB.belongsTo(Proyectos,{
    foreignKey: 'idProyectos',
    sourceKey: 'id'
});

Proyectos.hasMany(Columna, {
    foreignKey: 'idProyectos',
    targetId: 'id',
});

Columna.belongsTo(Proyectos,{
    foreignKey: 'idProyectos',
    targetId: 'id',
});

// (async () => {
//     await Campania.sync({ alter: true });
//  })();

module.exports = { Proyectos }