const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { permisoUsuario } = require('./permisoUsuario');
const { Usuario } = require('./usuario');



const Rol = sequelize.define('rol', {
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
        defaultValue: 1,
        allowNull:false
    },


},{timestamps: false});

Rol.hasMany(Usuario,{
    foreignKey: {
        name: 'idRol',
        allowNull: false,
    },
    sourceKey: 'id',
    allowNull: false
});

Usuario.belongsTo(Rol,{
    foreignKey: 'idRol',
    targetId: 'id',
    allowNull: false
});

Rol.hasMany(permisoUsuario, {
    foreignKey: 'idRol',
    sourceKey: 'id',
});

permisoUsuario.belongsTo(Rol, {
    foreignKey: 'idRol',
    targetId: 'id',
});

module.exports = {Rol}