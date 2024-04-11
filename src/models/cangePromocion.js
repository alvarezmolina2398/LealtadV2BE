const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const CangePromocion = sequelize.define('cangepromocions', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numeroTelefono: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {timestamps: false});

//(async () => {
   //  await sequelize.sync({ force: false });
      //Code here
//})();

module.exports = {CangePromocion, sequelize}