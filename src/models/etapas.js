const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Parametro } = require('./parametro');
const { PremioCampania } = require('./premioCampania');
const { Presupuesto } = require('./presupuesto');


const Etapa = sequelize.define('etapa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    orden: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
},{timestamps: false});


Etapa.hasMany(Presupuesto,{
    foreignKey: 'idEtapa',
    sourceKey: 'id'
});

Presupuesto.belongsTo(Etapa, {
    foreignKey: 'idEtapa',
    targetId: 'id',
});


Etapa.hasMany(Parametro,{
    foreignKey: 'idEtapa',
    sourceKey: 'id'
});

Parametro.belongsTo(Etapa, {
    foreignKey: 'idEtapa',
    targetId: 'id',
});



Etapa.hasMany(PremioCampania,{
    foreignKey: 'idEtapa',
    sourceKey: 'id'
});

PremioCampania.belongsTo(Etapa, {
    foreignKey: 'idEtapa',
    targetId: 'id',
});





// (async () => {
//     await sequelize.sync({ force: true });
//     // Code here
//  })();

module.exports = {Etapa}