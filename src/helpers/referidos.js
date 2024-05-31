const { Sequelize } = require("sequelize");
const { genesis, pronet, sequelize } = require("../database/database"); 
const { Campania } = require('../models/campanias');
const { participacionReferidos } = require('../models/participacionReferidos');
const { Participacion } = require('../models/Participacion');
const { codigoReferido } = require('../models/codigoReferidos');
// const { referidosIngresos } = require('../models/ReferidosIngresos'); // Aquí se agregó la importación faltante
const { ConfigReferido } = require('../models/configReferidos');
const { Usuario } = require('../models/usuario');
const { Op } = require('sequelize');

const getParticipaciones = async (campanas, fecha1, fecha2) => {
  try {
    // const { fechaInicio, fechaFin, campanas} = req.body;
    const fechaInicioFormatted = fecha1.toISOString().split('T')[0];
    const fechaFinFormatted = fecha2.toISOString().split('T')[0];
    let campanias = "";

    campanas.forEach((c, index) => {
      campanias += index > 0 ? `, '${c}'`: `'${c}'`;
    });

    const participaciones = await sequelize.query(`
      SELECT 
        c.id AS campania_id,
        c.nombre AS nombre_campania,
        c.descripcionNotificacion,
        p.fecha,
        p.descripcionTrx,
        p.valor,
        p.customerId,
        p.idTransaccion,
        cr.codigo AS codigo_referido,
        p2.refiriente,
        p2.referido,
        crf.opcion AS opcion_referido,
        u.nombre AS nombre_usuario,
        u.telefono AS telefono_usuario
      FROM 
        Campania c
      LEFT JOIN 
        Participacions p ON c.id = p.idCampania 
      LEFT JOIN 
        CodigosReferidos cr ON cr.customerId = p.customerId 
      LEFT JOIN 
        ConfigReferidos crf ON cr.codigo = crf.id
      LEFT JOIN 
        Usuarios u ON u.nombre = u.username 
      LEFT JOIN 
        participacionreferidos p2 ON p2.referido = cr.codigo
      WHERE p.fecha BETWEEN '${fechaInicioFormatted}' AND '${fechaFinFormatted}'
      AND c.nombre in (${campanias});		
    `, { type: sequelize.QueryTypes.SELECT });

    // res.status(200).json(participaciones);
    return participaciones;
  } catch (error) {
    console.error('Error al obtener las participaciones:', error);
    res.status(500).json({ error: 'Error al obtener las participaciones' });
  }
};

const getCustomerById = async (customerid) => {
  try {
    // const { customerid, fechaInicio, fechaFin } = req.body;
    const customerInfo = await pronet.query(`
      SELECT 
        tur.mname,
        CONCAT(tur.fname, ' ', tur.lname) nombreref, 
        tur.userno telref, 
        tur.userid 
      FROM 
        genesis.participante_campana pc 
      LEFT JOIN 
        pronet.tbl_customer tc ON tc.customer_id = pc.idUsuarioParticipante 
      LEFT JOIN 
        genesis.referidos_ingresos rin ON rin.idreferidos_ingresos = pc.idTransaccion 
      LEFT JOIN 
        pronet.tbl_customer tcr ON tcr.customer_id = rin.usuario 
      LEFT JOIN 
        pronet.tblUserInformation tur ON tur.userid = tcr.fk_userid
      WHERE 
        pc.fechaParticipacion BETWEEN '${fechaInicioFormatted}' AND '${fechaFinFormatted}'
        AND pc.idCampania in (${customerid})
        ORDER BY 
    tur.userid DESC LIMIT 5;
        
    `, {
      type: pronet.QueryTypes.SELECT
    });

    // res.status(200).json(customerInfo);
return customerInfo;

  } catch (error) {
    console.error('Error al obtener participaciones en la base de datos "genesis":', error);
    throw new Error('Error al obtener participaciones');
}
};

module.exports = { getParticipaciones, getCustomerById };
