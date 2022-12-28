const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/database');

const Departamento = sequelize.define('departamento', {
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
}, {timestamps: false});

(async () => {
    await sequelize.sync({forse:false});
})();

module.exports = {Departamento}