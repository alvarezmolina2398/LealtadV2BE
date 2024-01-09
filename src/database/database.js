const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtad", "root", "root123?", {
  host: '192.168.1.100',
  //host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };