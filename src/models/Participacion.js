const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { TransaccionPremio } = require('./transaccionPremio');

const { sumaTotal } = require('sequelize');

const Participacion = sequelize.define('participacions', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // fecha: {
    //     type: DataTypes.DATEONLY,
    //     allowNull: false
    // },
    customerId: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idtxt: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    descripcionTrx: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(1),
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(),
        allowNull: false
    },
    urlPremio: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    etapa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // idPremio: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // },
    idTransaccion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    idCampania: {
        type: DataTypes.INTEGER,
        allowNull: false
    },



}, { timestamps: false })


Participacion.hasMany(TransaccionPremio, {
    foreignKey: 'idParticipacion',
    sourceKey: 'id'
});


TransaccionPremio.belongsTo(Participacion, {
    foreignKey: 'idParticipacion',
    targetKey: 'id',
});


// (async () => {
//     await Participacion.sync({ alter: true });
    
// })();

// TransaccionPremio.sync({ alter: true }).then(() => {
//     console.log('tabla TransaccionPremio creada');
// });



module.exports = { Participacion }