const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');



const Usuario = sequelize.define('usuario', {
    username: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    telefono:{
        type: DataTypes.STRING(15),
        allowNull:true
    },
    emailNotificacion: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }

},{timestamps: false});


//(async () => {
  //  await sequelize.sync({ force: true });
//})();

module.exports = {Usuario}