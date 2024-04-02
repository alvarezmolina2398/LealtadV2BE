const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
  //host: '192.168.1.100',
<<<<<<< HEAD
    host: "34.170.217.35",
=======
  host: "34.170.217.35",
>>>>>>> feature-tablaDB
  dialect: "mysql",
});

const pronet = new Sequelize(
  "pronet",
  "devusr",
  "efHBxdcV", 
  {
    host: "172.16.50.27",
    port: "3306",
    dialect: "mysql",
  }
)

module.exports = { sequelize, pronet };