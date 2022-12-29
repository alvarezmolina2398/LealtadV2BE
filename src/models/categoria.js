const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{timestamps: false});


// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//  })();

module.exports = {Categoria}