
// const { Sequelize, DataTypes, Op, pronet, genesis } = require('sequelize');
// const {CodigoReferido} = require('../models/codigoReferidos');
// const {Participacion} = require('../models/Participacion')
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// const referidosIngresos = sequelize.define('referidos_ingresos', {
//   idcodigos_referidos: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   usuario: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   fecha: {
//     type: DataTypes.DATE,
//     allowNull: false
//   }
// });

// const tblCustomer = sequelize.define('tbl_customer', {
//   customer_id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   fk_userid: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// });

// const tblUserInformation = sequelize.define('tblUserInformation', {
//   userid: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   userno: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   fname: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lname: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// CodigoReferido.hasMany(referidosIngresos, { foreignKey: 'idcodigos_referidos' });
// referidosIngresos.belongsTo(codigosReferidos, { foreignKey: 'idcodigos_referidos' });

// tblCustomer.hasOne(tblUserInformation, { foreignKey: 'userid' });
// tblUserInformation.belongsTo(tblCustomer, { foreignKey: 'userid' });

// async function getParticipacionesFechasGeneral(fechaIni, fechafin) {

//   // const { fechaInicial, fechaFinal } = req.body;

//     const fechafin = new Date(fechaFinal);
//     const fechaIni = new Date(fechaInicial);
//   const Participacion = await CodigoReferido.findAll({
//     include: [
//       {
//         model: referidosIngresos,
//         where: {
//           fecha: {
//             [Op.between]: [fechaIni + ' 00:00:00', fechafin + ' 23:59:59']
//           }
//         },
//         include: [
//           {
//             model: tblCustomer,
//             as: 'csc',
//             include: [
//               {
//                 model: tblUserInformation,
//                 as: 'uic'
//               }
//             ]
//           },
//           {
//             model: tblCustomer,
//             as: 'csr',
//             include: [
//               {
//                 model: tblUserInformation,
//                 as: 'uir'
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   });

//   return Participacion;
// }

// module.exports = {getParticipacionesFechasGeneral, Participacion}

const { Op, sequelize, } = require("sequelize");
const { participacionReferidos } = require("../models/participacionReferidos");
const {CodigoReferido} = require('../models/codigoReferidos')

const getParticipacionesFechasGeneral = async (req, res) => {
  try {
    const { fechaInicial, fechaFinal } = req.body;

    const fechafin = new Date(fechaFinal);
    const fechaIni = new Date(fechaInicial);

    const trxAll = await participacionReferidos.findAll({
      include: {
        model: CodigoReferido,
      },
      where: {
        fecha: {
          [Op.gte]: fechaIni,
        },
        fecha: {
          [Op.lte]: fechafin,
        },
      },
    });
    res.json(trxAll);
  } catch (error) {
    console.log(error);
    res.status(403);
    res.send({ errors: "Hubo un problema al cargar la data." });
  }
};

module.exports = { getParticipacionesFechasGeneral };
