const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Permitidos = sequelize.define('permitidos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    numero:{
        type: DataTypes.STRING(150),
        allowNull: false
    },
    estado:{
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {timestamps: false});
/*
(async () => {
    await Permitidos.sync({ alter: true });
 })();
*/
module.exports = {Permitidos}