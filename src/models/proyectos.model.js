const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
<<<<<<< HEAD
const { Campania } = require('./campanias');
=======
const { TablaDB } = require('./tabladb');
const { Columna } = require('./columna');
>>>>>>> 27dfa5f9998086e16efd56c6ace6313491efce9d

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

module.exports = { Proyectos }