const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { DetallePromocion } = require("../models/detallePromocion");
const { PremioPromocion } = require('./premioPromocion');

const ReportePromocion = sequelize.define('reportePromocion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fecha_Acreditacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.NUMBER(12),
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    campain: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    premio: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    monto: {
        type: DataTypes.NUMBER(15),
        allowNull: false,
    },
    transaccion: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    monto_transaccion: {
        type: DataTypes.NUMBER(50),
        allowNull: false,
    },
    fecha_participacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, { timestamps: false });



Promocion.hasMany(DetallePromocion, {
    foreignKey: 'idPromocion',
    sourceKey: 'id'
});

DetallePromocion.belongsTo(Promocion, {
    foreignKey: 'idPromocion',
    targetId: 'id',

});


Promocion.hasMany(PremioPromocion, {
    foreignKey: 'idPromocion',
    sourceKey: 'id'
});

PremioPromocion.belongsTo(Promocion, {
    foreignKey: 'idPromocion',
    targetId: 'id',

});

module.exports = { ReportePromocion, sequelize }