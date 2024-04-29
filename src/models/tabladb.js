const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Columna } = require('./columna');

const TablaDB = sequelize.define('tabladb', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_tabla: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  estado: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, { timestamps: false });

TablaDB.hasMany(Columna, {
  foreignKey: 'idTablas',
  sourceKey: 'id',
});

Columna.belongsTo(TablaDB, {
  foreignKey: 'idTablas',
  targetId: 'id',
});



module.exports = { TablaDB };