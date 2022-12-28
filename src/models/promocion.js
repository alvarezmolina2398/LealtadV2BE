const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { DetallePromocion } = require("../models/detallePromocion")
const Promocion = sequelize.define('promocion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nemonico: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    mesajeExito: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    mesajeFail: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    imgSuccess: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    imgFail: {
        type: DataTypes.STRING(1000),
        allowNull: false,
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    PremioXcampania: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { timestamps: false });



Promocion.hasMany(DetallePromocion, {
    foreignKey: 'idPromocion',
    sourceKey: 'id'
});

DetallePromocion.belongsTo(DetallePromocion, {
    foreignKey: 'idPromocion',
    targetId: 'id',

});


// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
// })();

module.exports = { Promocion }