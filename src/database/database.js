const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "root", "root12345", {
  //host: '192.168.1.100',
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };