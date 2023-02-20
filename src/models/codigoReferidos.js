const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { ConfigReferido } = require('./configReferidos');
const { participacionReferidos } = require('./participacionReferidos');

//Codigos alfanumericos de 10 caracteres
const codigoReferidos = sequelize.define('codigosReferidos', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    codigo: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {timestamps:  false});

codigoReferidos.hasMany(participacionReferidos,{
    foreignKey: 'idCodigo',
    sourceKey: 'id'
});

participacionReferidos.belongsTo(codigoReferidos, {
    foreignKey: 'idCodigo',
    targetId: 'id',
    
});


//  (async () => {
//     await sequelize.sync({ force: false});
//  })()


module.exports={codigoReferidos}