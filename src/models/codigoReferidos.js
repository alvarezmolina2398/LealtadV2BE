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
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
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