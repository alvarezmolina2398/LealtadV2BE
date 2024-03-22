const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("lealtadV2", "root", "B@rilhas2003", {
//   //host: '192.168.1.100',
//   host: "localhost",
//   dialect: "mysql",
  
// });

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
  //host: '192.168.1.100',
  host: "34.135.223.20",
  dialect: "mysql",
  
});

module.exports = { sequelize };