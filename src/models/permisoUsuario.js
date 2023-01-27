const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/database');

const permisoUsuario = sequelize.define('permisoUsuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fechaAsignacion: {
        type: DataTypes.DATEONLY
    }
}, {timestamps: false});

//(async () => {
  //await sequelize.sync({ force: true });
//     // Code here
//})();

module.exports = {permisoUsuario}