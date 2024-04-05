const { Sequelize } = require("sequelize");
const { genesis, pronet } = require("../database/database");

const GetParticipacionReferidos = async (req, res) => {
  try {
    const { fechaInicio, fechaFin, selectids } = req.body;

    console.log("fecha inicial", fechaInicio);
    console.log("fecha final ", fechaFin);

    // Usar la instancia 'genesis' para la consulta
    const resultados = await genesis.query(
      `SELECT eca.nombreCampana, eca.descripcionNotificacion,
      CONCAT(tui.fname, ' ', tui.lname) nombre, tui.userno, 
     DATE_FORMAT(pca.fechaParticipacion, '%d/%m/%Y %H:%i') fecha, pca.idTransaccion, pca.descTransaccion, 
     FORMAT(pca.valorPremio,2) valorPremio, cre.codigo, cor.opcion, 
     CONCAT(tur.fname, ' ', tur.lname) nombreref, tur.userno telref 
     FROM genesis.participante_campana pca 
     INNER JOIN genesis.enc_campana eca ON eca.idCampana = pca.idCampana
     LEFT JOIN pronet.tbl_customer tc ON tc.customer_id = pca.idUsuarioParticipante 
     LEFT JOIN pronet.tblUserInformation tui ON tui.userid = tc.fk_userid 
     LEFT JOIN genesis.referidos_ingresos rin ON rin.idreferidos_ingresos = pca.idTransaccion 
     LEFT JOIN genesis.codigos_referidos cre ON cre.idcodigos_referidos = rin.idcodigos_referidos 
     LEFT JOIN genesis.confi_referidos cor on cor.idconfi_referidos = cre.idconfi_referidos 
     LEFT JOIN pronet.tbl_customer tcr ON tcr.customer_id = rin.usuario 
     LEFT JOIN pronet.tblUserInformation tur ON tur.userid = tcr.fk_userid
     WHERE (SELECT COUNT(*) FROM genesis.det_campana_participacion dcp 
     WHERE dcp.idCampana = eca.idCampana AND dcp.idTransaccion IN (68,69)) >0 AND eca.idCampana IN '${selectids}' AND pca.fechaParticipacion
      BETWEEN :fechaInicio AND :fechaFin
   `,
      {
        replacements: { fechaInicio, fechaFin },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    console.log("Resultados",resultados);
    res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener los datos." });
  }
};

module.exports = { GetParticipacionReferidos };
