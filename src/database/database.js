const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
  //host: '192.168.1.100',
  host: "34.135.223.20",
  dialect: "mysql",
});



const sequelizeBilletera = new Sequelize("pronet", "devusr", "efHBxdcV", {
  //host: '192.168.1.100',
  host: "172.16.50.27",
  dialect: "mysql",
});




module.exports = { sequelize,sequelizeBilletera };