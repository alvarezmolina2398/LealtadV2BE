const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "lealtadV2",
  "DesaSolUn",
  "SolUn123",
  //   "root",
  // "admin",
  {
    host: "35.223.87.209",
    // host: 'localhost',
    dialect: "mysql",
  }
);

const pronet = new Sequelize("pronet", "devusr", "efHBxdcV", {
  host: "172.16.50.27",
  port: "3306",
  dialect: "mysql",
});

const genesis = new Sequelize("genesis", "devusr", "efHBxdcV", {
  host: "172.16.50.27",
  port: "3306",
  dialect: "mysql",
});

module.exports = { sequelize, pronet, genesis};
