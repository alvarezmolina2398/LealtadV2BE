const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
  //host: '192.168.1.100',
  host: "34.69.145.123",
  dialect: "mysql",
}); 

module.exports = { sequelize };