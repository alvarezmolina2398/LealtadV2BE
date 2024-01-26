const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "root", "", {
  //host: '192.168.1.100',
  host: "127.0.0.1",
  dialect: "mysql",
});

module.exports = { sequelize };