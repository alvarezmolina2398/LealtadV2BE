const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/database');
const {Municipio} = require('./municipio')
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


Departamento.hasMany(Municipio,{
    foreignKey: 'idDepartamento',
    sourceKey: 'id'
});

Municipio.belongsTo(Departamento, {
    foreignKey: 'idDepartamento',
    targetId: 'id',
    
});





//(async () => {
//   await sequelize.sync({forse:true});
//})();

module.exports = {Departamento}