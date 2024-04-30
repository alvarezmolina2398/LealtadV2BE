const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');

const TransaccionPremio = sequelize.define('transaccionpremios', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    }
}, { timestamps: false });

// (async () => {
//     await sequelize.sync({ force: false });
//     // Code here
// })();


module.exports = { TransaccionPremio, sequelize }