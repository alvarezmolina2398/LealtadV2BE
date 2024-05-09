const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/database');



const Municipio = sequelize.define('municipios', {
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
        defaultValue: 1,
        allowNull:false
    },


},{timestamps: false});

//(async () => {
//    await sequelize.sync({ force: true });
//     // Code here
//  })();


module.exports = {Municipio}