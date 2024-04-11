const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { participacionReferidos } = require('./participacionReferidos');

//Creacion de tabla y declaracion de sus atributos correspondientes
const codigoReferido = sequelize.define('codigoReferido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigoReferido: {   
        type: DataTypes.STRING(500),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    customerId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{timestamps: false});

codigoReferido.hasMany(participacionReferidos,{
    foreignKey: 'idParticipacion',
    sourceKey: 'id'
});

module.exports = {codigoReferido}
