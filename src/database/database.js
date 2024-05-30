// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//     "lealtadV2",
//     "DesaSolUn",
//     "SolUn123",
//     //   "root",
//     // "admin",
//     {
//         host: "34.132.97.231",

//         // host: 'localhost',
//         dialect: "mysql",
//     }
// );

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "db0csmijjuvbuo",
    "uhxm0qdfefvou",
    "DesaSolUn",
    {
        host: "34.174.109.166",
        dialect: "mysql",
}
);

// const sequelize = new Sequelize(
//     "lealtadV2",
//     // "DesaSolUn",
//     // "SolUn123",
//       "root",
//     "admin",
//     {
  

//         host: 'localhost',
//         port: "3006",
//         dialect: "mysql",
//     }
// );


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

module.exports = { sequelize, pronet, genesis };