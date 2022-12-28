const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const DetallePromocion = sequelize.define('detallePromocion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cupon: {
        type: DataTypes.STRING(100),
        allowNull:false,
    },
    esPremio: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull:false,
        defaultValue: 1
    },
},{timestamps: false});




(async () => {
    await sequelize.sync({ force: false });
    // Code here
  })(); 

module.exports = {DetallePromocion}