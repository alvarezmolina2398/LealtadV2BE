const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Transaccion } = require('./transaccion');
const { Columna } = require('./columna');
const { Campania } = require('./campanias');


const Parametro = sequelize.define('parametros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    limiteParticipacion: {
        type: DataTypes.INTEGER
    },
    idCampania: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idTransaccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipoTransaccion: {
        type: DataTypes.CHAR(1),
        allowNull: false
    },
    ValorMinimo: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    ValorMaximo: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false
    },
    valorAnterior: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    idTipoParticipacion: {
        type: DataTypes.INTEGER
    },
    estado: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    idEtapa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { timestamps: false });

Transaccion.hasMany(Parametro, {
    foreignKey: 'idTransaccion'
});
Parametro.belongsTo(Transaccion, {
    foreignKey: 'idTransaccion'
});

// Campania.hasMany(Parametro, {
//     foreignKey: 'idCampania'
// });
// Parametro.belongsTo(Campania, {
//     foreignKey: 'idCampania'
// });
// Columna.hasMany(Parametro, { 
//     foreignKey: 'idColumna', 
// });
// Parametro.belongsTo(Columna, { 
//     foreignKey: 'idColumna', 
// });


// (async () => {
//     await Parametro.sync({ alter: true });
//     //Code here
// })();

module.exports = { Parametro }