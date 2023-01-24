const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const Pagina = sequelize.define('pagina', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    path: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
},{timestamps: false});

//(async () => {
    //await sequelize.sync({ force: true });
 //})();

module.exports = {Pagina}