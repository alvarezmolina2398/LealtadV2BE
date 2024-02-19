const { QueryTypes } = require('sequelize');

const fechaminimavalida = async () =>
    await sequelize.query(`SELECT MIN(fechaInicio) AS fechaApartir
        FROM genesis.enc_campana
            WHERE fechaFinal >= CAST(NOW() AS DATE) AS fechaInicio`, { type: QueryTypes.SELECT });

const fechamaximavalida = async () =>
    await sequelize.query(`SELECT MIN(fechaFinal) AS fechaFinal
        FROM genesis.enc_campana
            WHERE fechaFinal >= CAST(NOW() AS DATE) AS fechaInicio`, { type: QueryTypes.SELECT });

const usuarioParticipantes = async () =>
    await sequelize.query(`SELECT
            pc.idUsuarioParticipante, tc.telno,
            CONCAT_WS(' ', tui.fname, tui.mname, tui.lname, tui.slname) AS nombre
                FROM genesis.participante_campana_adicional pc
                JOIN pronet.tbl_customer tc ON tc.customer_id = pc.idUsuarioParticipante
                JOIN pronet.tblUserInformation tui ON tui.userid = tc.fk_userid
                    WHERE yaAplico = 0 AND fechaParticipacion
                        BETWEEN '${fechamaximavalida} 00:00:00'
                        AND '${fechamaximavalida} 23:59:59'
                    GROUP BY pc.idUsuarioParticipante, tc.telno, tui.fname, tui.mname, tui.lname, tui.slname;
        `, { type: QueryTypes.SELECT });

module.exports = { fechaminimavalida, fechamaximavalida, usuarioParticipantes }