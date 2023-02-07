const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const asignarCategoria = sequelize.define('asignarCategoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATEONLY
    }

}, {timestamps: false});

/*(async () => {
  await sequelize.sync({ force: true });
//     // Code here
})();*/

module.exports = {asignarCategoria}