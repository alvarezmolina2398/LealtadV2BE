const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const {  Bloqueados } = require('./bloqueados');
const { Etapa } = require('./etapa');
const { Participacion } = require('./Participacion');
const { Participantes } = require('./participantes');
const { Parametro } = require('./parametro');

const Campania = sequelize.define('campania', {
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
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    fechaCreacion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaRegistro:{
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fechaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    diaReporte: { // Nuevo campo: Entero para el día
        type: DataTypes.INTEGER,
        allowNull: false
    },
    horaReporte: { // Nuevo campo: Tipo Time que guarda únicamente la hora
        type: DataTypes.TIME,
        allowNull: false
    },
    emails: { // Nuevo campo: String de correos electrónicos separados por coma
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    edadInicial: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    edadFinal: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    sexo: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    tipoUsuario: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    tituloNotificacion: {
        type:  DataTypes.STRING(1000),
        allowNull: false
    },
    descripcionNotificacion: {
        type:  DataTypes.STRING(1000),
        allowNull: false
    },
    imgPush: {
        type:  DataTypes.TEXT('long'),
        allowNull: false
    },
    imgAkisi: {
        type:  DataTypes.TEXT('long'),
        allowNull: false
    },
    estado : {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    maximoParticipaciones: {
        type:  DataTypes.INTEGER,
        allowNull: false
    },
    diaReporte: {
        type:  DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    horaReporte: {
        type:  DataTypes.TIME,
        allowNull: true,
        defaultValue: '09:00:00'
    },
    emails: {
        type:  DataTypes.STRING(1000),
        allowNull: true,
        defaultValue: 'estiven6647@gmail.com'
    },
},{timestamps: false});



Campania.hasMany(Etapa,{
    foreignKey: 'idCampania',
    sourceKey: 'id'
});

Etapa.belongsTo(Campania, {
    foreignKey: 'idCampania',
    targetId: 'id',
});

Campania.hasMany(Participantes,{
    foreignKey: 'idCampania',
    sourceKey: 'id'
});

Participantes.belongsTo(Campania, {
    foreignKey: 'idCampania',
    targetId: 'id',
});

Campania.hasMany(Bloqueados,{
    foreignKey: 'idCampania',
    sourceKey: 'id'
});

Bloqueados.belongsTo(Campania, {
    foreignKey: 'idCampania',
    targetId: 'id',
});

Campania.hasMany(Participacion, {
    as: 'participaciones',
    foreignKey: {
        name: 'idCampania',
        allowNull: false,
    },
    sourceKey: 'id',
    allowNull: false
});

Participacion.belongsTo(Campania,{
    foreignKey: 'idCampania',
    targetId: 'id',
    allowNull: false
});

Parametro.belongsTo(Campania,{
    foreignKey: 'idCampania',
    targetId: 'id',
    allowNull: false
});
//(async () => {
    //await sequelize.sync({ force: true });
//     // Code here
//})();

// Campania.sync({ force: false }).then(() => {
//     console.log('tabla campania creada');
// });

module.exports = {Campania}