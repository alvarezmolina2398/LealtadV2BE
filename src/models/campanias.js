const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Bloqueados } = require('./bloqueados');
const { Etapa } = require('./etapa');
const { Participacion } = require('./Participacion');
const { Participantes } = require('./participantes');
const { Parametro } = require('./parametro');
// const {Usuario} = require('./usuario');

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
    campaniaTerceros:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    terminosCondiciones:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    observaciones:{
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    esArchivada:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    restriccionUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

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
// Campania.belongsTo(Usuario, { foreignKey: 'tipoUsuario' });

// Campania.hasMany(Configuraciones, {
//     foreignKey: 'idCampania',
//     sourceKey: 'id'
// });

// Configuraciones.belongsTo(Campania, {
//     foreignKey: 'idCampania',
//     targetId: 'id',
// });


// Campania.sync({ alter: true }).then(() => {
//     console.log('tabla campania creada');
// });


// Configuraciones.sync({ alter: true }).then(() => {
//     console.log('Tabla Configuraciones creada o actualizada correctamente');
// });


module.exports={Campania}