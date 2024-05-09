const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const Presupuesto = sequelize.define('presupuesto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    idDepartamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idMunicipio: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    limiteGanadores: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    valor:{
        type: DataTypes.DECIMAL(18,2),
        allowNull:false
    },
    presupuestoDiario:{
        type: DataTypes.DECIMAL(18,2),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    idEtapa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{timestamps: false});


// (async () => {
//     await Presupuesto.sync({ alter: true });
//     // Code here
//  })();



module.exports = {Presupuesto}