const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { participacionReferidos } = require('./participacionReferidos');

//Creacion de tabla y declaracion de sus atributos correspondientes
const ConfigReferido = sequelize.define('configReferido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{timestamps: false});

ConfigReferido.hasMany(participacionReferidos,{
    foreignKey: 'idParticipacion',
    sourceKey: 'id'
});

participacionReferidos.belongsTo(ConfigReferido, {
    foreignKey: 'idParticipacion',
    targetId: 'id',
    
});

//relacion entre tablas, menu tiene muchas paginas
/*Menu.hasMany(Pagina,{
    foreignKey: 'idMenu',
    sourceKey: 'id'
});*/


/*  (async () => {
    await sequelize.sync({ force: false });
  })(); */

module.exports = {ConfigReferido}