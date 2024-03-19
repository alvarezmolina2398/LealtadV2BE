const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
  //host: '192.168.1.100',
  host: "34.16.37.157",
  dialect: "mysql",
});

module.exports = { sequelize };