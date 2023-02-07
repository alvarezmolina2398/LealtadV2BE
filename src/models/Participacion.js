const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { TransaccionPremio } = require('./transaccionPremio');

const Participacion = sequelize.define('participacion', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    customerId: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idtxt: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcionTrx: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    etapa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{timestamps: false})


Participacion.hasMany(TransaccionPremio,{
    foreignKey: 'idParticipacion',
    sourceKey: 'id'
});

TransaccionPremio.belongsTo(Participacion, {
    foreignKey: 'idParticipacion',
    targetId: 'id',
});

//(async () => {
    //await sequelize.sync({ force: true });
//     // Code here
//})();

module.exports = {Participacion}