const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
    //host: '192.168.1.100',
    host: "35.223.201.149",
    dialect: "mysql",
});

// const sequelize = new Sequelize("lealtadV2", "root", "B@rilhas2003", {
//   //host: '192.168.1.100',
//   host: "localhost",
//   dialect: "mysql",
// });

const genesis = new Sequelize(
  "genesis",
  "devusr",
  "efHBxdcV", {
      host: "172.16.50.27",
      port: "3306",
      dialect: "mysql",
  }
)

const pronet = new Sequelize(
    "pronet",
    "devusr",
    "efHBxdcV", {
        host: "172.16.50.27",
        port: "3306",
        dialect: "mysql",
    }
)

module.exports = { sequelize, pronet, genesis };