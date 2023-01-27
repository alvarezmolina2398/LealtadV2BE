const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { permisoUsuario } = require('./permisoUsuario');



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

Usuario.hasMany(permisoUsuario, {
    foreignKey: 'username',
    sourceKey: 'username',
});

permisoUsuario.belongsTo(Usuario, {
    foreignKey: 'username',
    targetId: 'username',
});


//(async () => {
  //  await sequelize.sync({ force: true });
//})();

module.exports = {Usuario}