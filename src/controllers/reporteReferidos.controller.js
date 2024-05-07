const { Sequelize } = require("sequelize");
const { genesis, pronet, sequelize } = require("../database/database"); 
const { Campania } = require('../models/campanias');
const { participacionReferidos } = require('../models/participacionReferidos');
const { Participacion } = require('../models/Participacion');
const { codigoReferido } = require('../models/codigoReferidos');
const { referidosIngresos } = require('../models/ReferidosIngresos'); // Aquí se agregó la importación faltante
const { ConfigReferido } = require('../models/configReferidos');
const { Op } = require('sequelize');

const GetParticipacionReferidos = async (req, res) => {
  try {
    const {  fechaInicio, fechaFin } = req.body;
    
    console.log("Fechainicio",fechaInicio);
    // console.log("IDcamapanias", id);


    console.log("fechafin",fechaFin);
    // console.log("customerId",customerId);

    const obtenerRef = await Campania.findAll({
      where: {
        // id:id,
        fechaInicio: { [Op.gte]: fechaInicio },
        fechaFin: { [Op.lte]: fechaFin },
        estado: 1,
      },
      include: [{
        model: Participacion,
        as: 'participaciones',
        attributes: ['fecha', 'descripcionTrx', 'valor', 'customerId', 'idTransaccion', 'idCampania'],  
        include: [{
            model: codigoReferido,
            // as: 'codigosreferidos', 
            attributes: ['codigo'],
            include: [{
                model: ConfigReferido,
                attributes: ['opcion'],
            }, {
                model: participacionReferidos,  
                attributes: ['refiriente', 'referido'],
            }]    
        }]
      }]
    });

    const NuevoArray = [];
    for (const c of obtenerRef) {
      for (const p of c.participaciones) {
        NuevoArray.push({
          opcion: p.ConfigReferido,
          nombre: c.nombre,
          descripcionNotificacion: c.descripcionNotificacion,
          codigo: p.codigosReferido,
          telefonoUsuario: p.usuario,
          nombreUsuario: p.usuario,
          fecha: p.fecha,
          descripcionTrx: p.descripcionTrx,
          montoPremio: p.valor, 
          refiriente: p.participacionReferidos,
          referido: p.participacionReferidos ,
        });
      } 
    }

    res.status(200).json(NuevoArray);
  } catch (error) {
    console.error('Error al obtener las campañas:', error);
    res.status(403).send({ errors: 'Ha ocurrido un error al obtener los datos .' });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const {customerId, fechaInicio,fechaFin}= req.body
    const customerInfo = await pronet.query(`
    select tur.mname ,
    CONCAT(tur.fname, ' ', tur.lname) nombreref, tur.userno telref, tur.userid 
    from genesis.participante_campana pc 
    LEFT JOIN 
    pronet.tbl_customer tc ON tc.customer_id = pc.idUsuarioParticipante 
     LEFT JOIN 
        genesis.referidos_ingresos rin ON rin.idreferidos_ingresos = pc.idTransaccion 
     LEFT JOIN 
        pronet.tbl_customer tcr ON tcr.customer_id = rin.usuario 
     LEFT JOIN 
        pronet.tblUserInformation tur ON tur.userid = tcr.fk_userid
    WHERE 
      pc.fechaParticipacion BETWEEN '${fechaInicio}' AND '${fechaFin}'
      AND pc.idCampana = '${Campania}';
    `, {
      type: pronet.QueryTypes.SELECT
    });

    res.status(200).json(customerInfo);
  } catch (error) {
    console.error('Error al obtener la información del cliente:', error);
    throw new Error('Error al obtener la información del cliente');
  }
  
};

module.exports = { GetParticipacionReferidos, getCustomerById };