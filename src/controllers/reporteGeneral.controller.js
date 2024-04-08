const { pronet, genesis } = require('../database/database');

// Función para obtener participaciones en fechas generales desde la base de datos "pronet"
async function postParticipacionesFechasGeneral(fecha1, fecha2) {
  try {
    const results = await genesis.query(`
      SELECT uic.userno, CONCAT(uic.fname, ' ', uic.lname) AS nombreReferidor, codRef.codigo, uir.userno AS noReferido,
        CONCAT(uir.fname, ' ', uir.lname) AS nombreReferido, DATE_FORMAT(ri.fecha, '%d/%m/%Y %H:%i') AS fecha
        FROM genesis.codigos_referidos codRef
        INNER JOIN genesis.referidos_ingresos ri ON codRef.idcodigos_referidos = ri.idcodigos_referidos
        INNER JOIN pronet.tbl_customer csc ON csc.customer_id = codRef.idUsuario
        INNER JOIN pronet.tblUserInformation uic ON uic.userid = csc.fk_userid
        INNER JOIN pronet.tbl_customer csr ON csr.customer_id = ri.usuario
        INNER JOIN pronet.tblUserInformation uir ON uir.userid = csr.fk_userid
        WHERE ri.fecha BETWEEN :fecha1 AND :fecha2
        LIMIT 10;
    `, {
      replacements: { fecha1: `${fecha1} 00:00:00`, fecha2: `${fecha2} 23:59:59` },
      type: genesis.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Error al obtener participaciones en la base de datos "genesis":', error);
    throw error;
  }
}

// Función para obtener participaciones en fechas generales desde la base de datos "genesis"
async function getParticipacionesFechasGeneralGenesis(fecha1, fecha2) {
  try {
    const results = await genesis.query(`
      SELECT * FROM codigos_referidos WHERE fecha BETWEEN :fecha1 AND :fecha2
    `, {
      replacements: { fecha1: `${fecha1} 00:00:00`, fecha2: `${fecha2} 23:59:59` },
      type: genesis.QueryTypes.SELECT
    });

    return results;
  } catch (error) {
    console.error('Error al obtener participaciones en la base de datos "genesis":', error);
    throw error;
  }
}


// Ejemplo de uso de la función
const fecha1 = '2023-03-26';
const fecha2 = '2024-03-26';

postParticipacionesFechasGeneral(fecha1, fecha2)
  .then(results => {
    console.log('Participaciones obtenidas desde la base de datos "pronet":', results);
  })
  .catch(error => {
    console.error('Error al obtener participaciones en la base de datos "pronet":', error);
  });

getParticipacionesFechasGeneralGenesis(fecha1, fecha2)
  .then(results => {
    console.log('Participaciones obtenidas desde la base de datos "genesis":', results);
  })
  .catch(error => {
    console.error('Error al obtener participaciones en la base de datos "genesis":', error);
  });
  
  module.exports = { postParticipacionesFechasGeneral };


// const { Op, sequelize, } = require("sequelize");
// const { participacionReferidos } = require("../models/participacionReferidos");
// const {CodigoReferido} = require('../models/codigoReferidos');

// const getParticipacionesFechasGeneral = async (req, res) => {
//   try {
//     const { fechaInicial, fechaFinal } = req.body;

//     const fechafin = new Date(fechaFinal);
//     const fechaIni = new Date(fechaInicial);

//     const trxAll = await CodigoReferido.findAll({
//       // include: {
//       //   model: CodigoReferido,
//       // },
//       where: {
//         fecha: {
//           [Op.gte]: fechaIni,
//         },
//         fecha: {
//           [Op.lte]: fechafin,
//         },
//       },
//     });
//     res.json(trxAll);
//   } catch (error) {
//     console.log(error);
//     res.status(403);
//     res.send({ errors: "Hubo un problema al cargar la data." });
//   }
// };

// module.exports = { getParticipacionesFechasGeneral };
