const { Sequelize } = require("sequelize");
const { genesis, pronet, sequelize } = require("../database/database"); 

const getParticipaciones = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, campanas} = req.body;
    if (Array.isArray(campanas)) {
      let campania = "";

      campanas.forEach((c, index) => {
        campania+= index > 0 ? `, '${c}'`: `'${c}'`;
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
          campania c
        LEFT JOIN 
          participacions p ON c.id = p.idCampania 
        LEFT JOIN 
          codigosreferidos cr ON cr.customerId = p.customerId 
        LEFT JOIN 
          configreferidos crf ON cr.codigo = crf.id
        LEFT JOIN 
          usuarios u ON u.nombre = u.username 
        LEFT JOIN 
          participacionreferidos p2 ON p2.referido = cr.codigo
        WHERE p.fecha BETWEEN '${fechaInicio}' AND '${fechaFin}'
        AND c.nombre in (${campania});		
      `, { type: sequelize.QueryTypes.SELECT });

      res.status(200).json(participaciones);
    } else {
      throw new Error("El campo 'campanas' no está definido o no es un array.");
    }
  } catch (error) {
    console.error('Error al obtener las participaciones:', error);
    res.status(500).json({ error: 'Error al obtener las participaciones' });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { customerid, fechaInicio, fechaFin } = req.body;
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
        pc.fechaParticipacion BETWEEN '${fechaInicio}' AND '${fechaFin}'
        AND pc.idCampania in (${customerid})
        ORDER BY 
    tur.userid DESC LIMIT 5;
        
    `, {
      type: pronet.QueryTypes.SELECT
    });

    res.status(200).json(customerInfo);
  } catch (error) {
    console.error('Error al obtener la información del cliente:', error);
    res.status(500).json({ error: 'Error al obtener la información del cliente' });
  }
  
  
};
const obtenerCampaniasGenesis = async () => {
  try {
    // Ejecutar consulta SQL para obtener las campañas de Genesis
    const campanias = await genesis.query(`
      SELECT idCampana, nombreCampana, descripcionCampana
      FROM enc_campana; 
    `, {
      type: genesis.QueryTypes.SELECT
    });

    return campanias;
  } catch (error) {
    console.error('Error al obtener las campañas de Genesis:', error);
    throw new Error('Error al obtener las campañas de Genesis');
  }
};

module.exports = { getParticipaciones, getCustomerById,obtenerCampaniasGenesis };
