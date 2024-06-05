const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { participacionReferidos } = require('./participacionReferidos');
const {ConfigReferido}= require('../models/configReferidos');
const { Participacion } = require('./Participacion');


//Creacion de tabla y declaracion de sus atributos correspondientes
const codigoReferido = sequelize.define('codigosreferidos', {
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
},{timestamps: false,
    tableName: 'codigosreferidos'
});

codigoReferido.hasMany(participacionReferidos,{
    foreignKey: 'id',
    sourceKey: 'id'
});
participacionReferidos.belongsTo(codigoReferido, {
    foreignKey: 'id',
    targetKey: 'id',
});
codigoReferido.belongsTo(ConfigReferido, {
    foreignKey: 'id'
});

// (async () => {
//     await codigoReferido.sync({ alter: true });
//  })();

// Participacion.sync({ alter: true }).then(() => {
//     console.log('tabla Campania creada');
// });

module.exports = {codigoReferido}
