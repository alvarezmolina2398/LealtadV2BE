const { Sequelize } = require("sequelize");

 const sequelize = new Sequelize("lealtadV2", "DesaSolUn", "SolUn123", {
   //host: '192.168.1.100',
   host: "34.172.203.215",
   dialect: "mysql",
}); 

// const sequelize = new Sequelize("lealtadV2", "root", "admin", {
//   //host: '192.168.1.100',
//   host: "localhost",
//   dialect: "mysql",
// }); 



module.exports = { sequelize };