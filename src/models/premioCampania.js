const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const PremioCampania = sequelize.define('premiocampania', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    valor: {
        type: DataTypes.DECIMAL(18,2),
        allowNull: false
    }, 
    linkPremio:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
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

module.exports = {PremioCampania, sequelize}