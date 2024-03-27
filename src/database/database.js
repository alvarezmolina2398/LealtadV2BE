const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
 "lealtadV2",
  // "DesaSolUn",
  // "SolUn123",
  "root",
  "admin",
  {
    // host: "34.173.122.252",
    host: 'localhost',
  dialect: 'mysql',
  }
);

pronet = new Sequelize("pronet", "devusr", "efHBxdcV", {
  host: "172.16.50.27",
  port: "3306",
  dialect: "mysql",
});

module.exports = { sequelize, pronet };
