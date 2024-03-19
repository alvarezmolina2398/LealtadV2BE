const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const TablaDB = sequelize.define('TablaDB',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    nombre_tabla:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
},{timestamps: false});

module.exports = {TablaDB}