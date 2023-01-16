const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');


const PremioPromocion = sequelize.define('premioPromocion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    valor: {
        type: DataTypes.DECIMAL(18,2),
        allowNull: false
    }, 
    cantidad: {
        type: DataTypes.INTEGER,
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

module.exports = {PremioPromocion}