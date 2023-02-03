const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

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
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {timestamps:  false});

// (async () => {
//     await sequelize.sync({ force: false });
//  })()


module.exports={codigoReferidos}