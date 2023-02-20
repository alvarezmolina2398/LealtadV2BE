const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Pagina } = require('./pagina');

//Creacion de tabla y declaracion de sus atributos correspondientes
const Menu = sequelize.define('menu', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{timestamps: false});

//relacion entre tablas, menu tiene muchas paginas
Menu.hasMany(Pagina,{
    foreignKey: 'idMenu',
    sourceKey: 'id'
});

//relacion entre tablas, pagina tiene pertenece a un menu
Pagina.belongsTo(Menu, {
    foreignKey: 'idMenu',
    targetId: 'id',
});


/*(async () => {
    await sequelize.sync({ force: false });
 })();*/

module.exports = {Menu}