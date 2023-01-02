const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');



const Premio = sequelize.define('premio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
    claveSecreta: {
        type: DataTypes.STRING(500),
        allowNull:true
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull:false
    },
    idTransaccion: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

},{timestamps: false});


// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
// })();

module.exports = {Premio}