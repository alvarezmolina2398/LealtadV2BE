const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const EnviaPremio  = sequelize.define('enviaPremio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    telefono: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    campania: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{timestamps: false});



/*(async () => {
    await sequelize.sync({ force: false });
 })();*/

module.exports = {EnviaPremio }
