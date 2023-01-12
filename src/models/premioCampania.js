const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const PremioCampania = sequelize.define('premioCampania', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    ValorMaximo: {
        type: DataTypes.DECIMAL(18,2),
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

module.exports = {PremioCampania}