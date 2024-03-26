const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { participacionReferidos } = require('./participacionReferidos');

//Creacion de tabla y declaracion de sus atributos correspondientes
const CodigoReferido = sequelize.define('codigoReferido', {
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

CodigoReferido.hasMany(participacionReferidos,{
    foreignKey: 'idParticipacion',
    sourceKey: 'id'
});

participacionReferidos.belongsTo(CodigoReferido, {
    foreignKey: 'idParticipacion',
    targetId: 'id',
    
});


module.exports = {CodigoReferido}