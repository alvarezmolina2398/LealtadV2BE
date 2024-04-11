const { Sequelize } = require("sequelize");
const { genesis, pronet, sequelize } = require("../database/database");

const GetParticipacionReferidos = async (req, res) => {
  const { fechaInicio, fechaFin, id } = req.body;
  try {
   

    console.log("fecha inicial", fechaInicio);
    console.log("fecha final ", fechaFin);
    // Usar la instancia 'genesis' para la consulta
    // const resultados = await genesis.query(
    //   `SELECT eca.nombreCampana, eca.descripcionNotificacion,
    //   CONCAT(tui.fname, ' ', tui.lname) nombre, tui.userno,
    //   DATE_FORMAT(pca.fechaParticipacion, '%d/%m/%Y %H:%i') fecha, pca.idTransaccion, pca.descTransaccion, 
    //   FORMAT(pca.valorPremio,2) valorPremio,
    //   CONCAT(tur.fname, ' ', tur.lname) nombreref, tur.userno telref
    //   FROM genesis.participante_campana pca 
    //   INNER JOIN enc_campana eca ON eca.idCampana = pca.idCampana 
    //   LEFT JOIN pronet.tbl_customer tc ON tc.customer_id = pca.idUsuarioParticipante 
    //   LEFT JOIN pronet.tblUserInformation tui ON tui.userid = tc.fk_userid 
    //   LEFT JOIN genesis.referidos_ingresos rin ON rin.idreferidos_ingresos = pca.idTransaccion 
      
    //   LEFT JOIN pronet.tbl_customer tcr ON tcr.customer_id = rin.usuario 
    //   LEFT JOIN pronet.tblUserInformation tur ON tur.userid = tcr.fk_userid
    //   WHERE (SELECT COUNT(*) FROM genesis.det_campana_participacion dcp 
    //   WHERE dcp.idCampana = eca.idCampana AND dcp.idTransaccion IN (68,69)) >0 
    //   BETWEEN :fechaInicio  AND :fechaFin`,
      
    //   {
    //     replacements: { fechaInicio: fechaInicio, fechaFin: fechaFin },
    //     type: Sequelize.QueryTypes.SELECT,
    //   }
    // );
    const resultadosPronet = await genesis.query(` SELECT eca.nombreCampana, eca.descripcionNotificacion,
    CONCAT(tui.fname, ' ', tui.lname) nombre, tui.userno,
    DATE_FORMAT(pca.fechaParticipacion, '%d/%m/%Y %H:%i') fecha, pca.idTransaccion, pca.descTransaccion, 
    FORMAT(pca.valorPremio,2) valorPremio,
    cre.codigo AS codigos_referidos,
    cor.opcion,
    CONCAT(tur.fname, ' ', tur.lname) nombreref, tur.userno telref
    FROM genesis.participante_campana pca 
    INNER JOIN enc_campana eca ON eca.idCampana = pca.idCampana 
    LEFT JOIN pronet.tbl_customer tc ON tc.customer_id = pca.idUsuarioParticipante 
    LEFT JOIN pronet.tblUserInformation tui ON tui.userid = tc.fk_userid 
    LEFT JOIN genesis.referidos_ingresos rin ON rin.idreferidos_ingresos = pca.idTransaccion 
    LEFT JOIN genesis.codigos_referidos cre ON cre.idcodigos_referidos = rin.idcodigos_referidos 
    LEFT JOIN genesis.confi_referidos cor on cor.idconfi_referidos = cre.idconfi_referidos
    LEFT JOIN pronet.tbl_customer tcr ON tcr.customer_id = rin.usuario 
    LEFT JOIN pronet.tblUserInformation tur ON tur.userid = tcr.fk_userid
    WHERE (SELECT COUNT(*) FROM genesis.det_campana_participacion dcp 
    WHERE dcp.idCampana = eca.idCampana AND dcp.idTransaccion IN (68,69)) >0 
    BETWEEN '${fechaInicio}'  AND '${fechaFin}'`);
// Extraer el código de la primera consulta
console.log("\n\n\resultadosPronet",resultadosPronet);
const codigo = resultadosPronet[0].codigos_referidos;

console.log("\n\n\ncodigo",codigo);

// Consulta a la segunda base de datos (lealtadv2)
const resultadosLealtadV2 = await sequelize.query(`
select  c.nombre,c.descripcionNotificacion

from campania c 
left join codigoreferidos c3 on c3.id = c.id 
left join configreferidos c2 on c2.id = c3.id;  `);
    

console.log(resultadosLealtadV2);
const resultadosCombinados = [...resultadosPronet, ...resultadosLealtadV2];


    // res.status(200).json(resultadosLealtadV2);
    // res.status(200).json(resultadosPronet);
    res.status(200).json(resultadosCombinados);
    // res.status(200).json(resultadosLealtadV2);
    // console.log("lealtadV2",lealtadV2);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error al obtener los datos." });
  }
};

module.exports = { GetParticipacionReferidos };
