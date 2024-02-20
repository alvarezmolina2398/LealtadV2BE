const { QueryTypes } = require('sequelize');

const check_auth_client = async () => {

    const client_service = req.headers['Client-Service'];
    const auth_key = req.headers['Auth-Key'];

    return true

}

const auth = async (req, res) => {

    const users_id = req.headers['User-ID'];
    const token = req.headers['Authorization'];

    return { 'status': 200, 'message': 'Authorized.' }

}

const getTestTransaccion = async (base, tabla, campo, campoid, idTransaccion) =>
    await sequelize.query(`SELECT * FROM :base.:tabla WHERE :campoid = :idTransaccion;`, { raw: false, type: QueryTypes.SELECT, replacements: { base, tabla, campo, campoid, idTransaccion } });

const CampanasActualesActivas = async (idUsuario = 0, soloMostrar = 0) => {

    if (idUsuario == 0) {

        await sequelize.query(`SELECT
                    fechaRegistro, edadInicial, edadFinal,
                    tipoUsuario, sexo, usuariosInternos, UsuariosNuevos,
                    UsuariosAntiguos, idCampana, nombreCampana, filtradoNumero,
                    tipoPremio, limiteParticipaciones, tipoParticipacion, minimoTransacciones,
                    minimoAcumular, IFNULL(tituloNotificacion, 'Felicidades!!!') tituloNotificacion,
                    IFNULL(descripcionNotificacion, REPLACE('Usted esta participando en nuestra nueva promoción {nombreCampana}', '{nombreCampana}',
                    REPLACE(REPLACE(nombreCampana,'&#34;','\"'),'&#39;','\''))) descripcionNotificacion, iconoAkisi, imagenPush, descripcionCampana, 0 AS maximoDiario  
                FROM genesis.enc_campana WHERE estado = 1 AND fechaFinal >= CAST(NOW() AS DATE) AND fechaInicio <= CAST(NOW() AS DATE) 
                ORDER BY fechaCreacion DESC
            `, { raw: false, type: QueryTypes.SELECT });

    } else {

        /* await sequelize.query(`SELECT
                    fechaRegistro, edadInicial, edadFinal, tipoUsuario,
                    sexo, usuariosInternos, UsuariosNuevos, UsuariosAntiguos,
                    idCampana, nombreCampana, filtradoNumero, tipoPremio,
                    limiteParticipaciones, tipoParticipacion, minimoTransacciones, minimoAcumular,
                    IFNULL(tituloNotificacion, 'Felicidades!!!') tituloNotificacion,IFNULL(descripcionNotificacion,
                    REPLACE('Usted esta participando en nuestra nueva promoción {nombreCampana}', '{nombreCampana}',
                    REPLACE(REPLACE(nombreCampana,'&#34;','\"'),'&#39;','\''))) descripcionNotificacion, iconoAkisi,
                    imagenPush, descripcionCampana, 0 AS maximoDiario, limiteParticipaciones,
                        (SELECT COUNT(*) FROM genesis.participante_campana
                        WHERE idUsuarioParticipante = :idUsuario
                            AND participante_campana.idCampana = enc_campana.idCampana)
                        AS actualParticipaciones 
                FROM genesis.enc_campana 
                WHERE estado = 1 AND fechaFinal >= CAST(now() as date) AND fechaInicio <= CAST(now() as date)`
            , { raw: false, type: QueryTypes.SELECT, replacements: { idUsuario } }); */

    }
}

const CampanasActualesActivasTercero = async () =>
    await sequelize.query(`SELECT fechaRegistro, edadInicial, edadFinal, tipoUsuario,
                            sexo, usuariosInternos, UsuariosNuevos, UsuariosAntiguos,
                            idCampana, nombreCampana, filtradoNumero, tipoPremio,
                            limiteParticipaciones, tipoParticipacion, minimoTransacciones,
                            minimoAcumular, IFNULL(tituloNotificacion, 'Felicidades!!!') tituloNotificacion,
                            IFNULL(descripcionNotificacion, REPLACE('Usted esta participando en nuestra nueva promoción {nombreCampana}', '{nombreCampana}',
                            REPLACE(REPLACE(nombreCampana,'&#34;','\"'),'&#39;','\''))) descripcionNotificacion, iconoAkisi, imagenPush, descripcionCampana
                                FROM genesis.enc_campana
                            WHERE estado = 1
                                AND fechaFinal >= CAST(NOW() AS DATE)
                                AND fechaInicio <= CAST(NOW() AS DATE)
                                AND terceros = 1
                            ORDER BY fechaCreacion DESC;`, { raw: false, type: QueryTypes.SELECT });

const CampanaTransaccionesValidas = async (idCampana) =>
    await sequelize.query(`SELECT idLocal, valorMinimo, valorMaximo
                                FROM genesis.det_campana_participacion dcp
                            INNER JOIN genesis.transacciones t ON t.idTransaccion = dcp.idTransaccion
                            WHERE idCampana = :idCampana AND dcp.estado = 1;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana } });

const CampanaPremiosRetornarRandom = async (idCampana, idCampanaRegion) =>
    await sequelize.query(`SELECT p.idTransaccion, link, claveSecreta, dcp.valor,
                            t.descripcion, p.idPremio idtablaPremios, dppr.idPremioPR
                            FROM genesis.det_campana_premios dcp
                            INNER JOIN genesis.det_campana_premios_porcentaje_regiones dppr
                                ON dppr.idCampanaPremio = dcp.idCampanaPremio
                                AND dppr.estado = 1
                                AND limite > 0
                                AND dppr.limite > dppr.listo
                                AND dppr.idCampanaRegion = :idCampanaRegion
                            INNER JOIN genesis.premios p
                                ON p.idPremio = dcp.idPremio
                            LEFT JOIN genesis.transacciones t
                                ON p.idTransaccion = t.idTransaccion
                            WHERE idCampana = :idCampana
                                AND dcp.estado = 1 ORDER BY RAND() LIMIT 1;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, idCampanaRegion } });

const CampanaPremiosRetornarTodas = async (idCampana, idCampanaRegion) =>
    await sequelize.query(`SELECT p.idTransaccion, link, claveSecreta, dcp.valor,
                            t.descripcion, p.idPremio idtablaPremios, dppr.idPremioPR
                                FROM genesis.det_campana_premios dcp
                                INNER JOIN genesis.det_campana_premios_porcentaje_regiones dppr
                                    ON dppr.idCampanaPremio = dcp.idCampanaPremio
                                    AND dppr.estado = 1
                                    AND limite > 0
                                    AND dppr.limite > dppr.listo
                                    AND dppr.idCampanaRegion = :idCampanaRegion
                                INNER JOIN genesis.premios p
                                    ON p.idPremio = dcp.idPremio
                                LEFT JOIN genesis.transacciones t
                                    ON p.idTransaccion = t.idTransaccion
                                WHERE idCampana = :idCampana
                                    AND dcp.estado = 1;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, idCampanaRegion } });

const CampanaPremiosInfoCliente = async (base, tabla, campoid, idTransaccion) =>
    await sequelize.query(`SELECT telno, department, municipality
                                    FROM pronet.tbl_customer
                                WHERE customer_id = :idTransaccion;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { base, tabla, campoid, idTransaccion } });

const ValidarNumeroTelefono = async telno => {
    const data = await sequelize.query(`SELECT COUNT(*) existeNumero
                            FROM pronet.tbl_customer
                            WHERE telno = :telno;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { telno } });
    return data.length > 0 ? data[0]['existeNumero'] : [{}]
}

const CampanaNumerosRestringidos = async (idCampana, numero, restringe) => {

    if (restringe == 0) {
        return { 'permitido': 1 }
    } else if (restringe == 1) {
        return await sequelize.query(`SELECT COUNT(*) AS permitido FROM genesis.det_campana_numeros_p WHERE id_campana = :idCampana and numero = ':numero' and estado = 1;`
            , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, numero, restringe } });
    } else if (restringe == 2) {
        return await sequelize.query(`SELECT CASE WHEN COUNT(*)>0 THEN 0 ELSE 1 END AS permitido FROM genesis.det_campana_numeros_p WHERE id_campana = :idCampana and numero = ':numero' and estado = 1;`
            , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, numero } });
    } else {
        return 0
    }

}

const validarUnicaTransaccion = async (usuario, idTransaccion, horaTransaccion, descTransaccion) => 0

const validarUnicaTransaccion2 = async (usuario, idTransaccion, horaTransaccion, descTransaccion, idCampana) => {
    const data = await sequelize.query(`SELECT SUM(existe) existe FROM (
        SELECT COUNT(*) existe FROM genesis.participante_campana WHERE idTransaccion = :idTransaccion AND horaTransaccion = ':horaTransaccion' 
            AND descTransaccion = ':descTransaccion' and idUsuarioParticipante = :usuario AND idCampana = :idCampana
                UNION ALL 
        SELECT COUNT(*) existe FROM genesis.participante_campana_adicional WHERE idTransaccion = :idTransaccion AND horaTransaccion = ':horaTransaccion' 
            AND descTransaccion = ':descTransaccion' AND idUsuarioParticipante = :usuario AND idCampana = :idCampana) sumar`
        , { raw: false, type: QueryTypes.SELECT, replacements: { usuario, idTransaccion, horaTransaccion, descTransaccion, idCampana } });
    return data.length > 0 ? data[0]['existe'] : [{}]
}


const validarUnicaTransaccion3 = async (usuario, idTransaccion, idCampana) => {
    const data = await sequelize.query(`SELECT COUNT(*) AS existe
                        FROM genesis.participante_campana_adicional
                        WHERE idTransaccion = ':idTransaccion'
                        AND idCampanaParticipacion = :idCampana
                        AND idUsuarioParticipante = :usuario`
        , { raw: false, type: QueryTypes.SELECT, replacements: { usuario, idTransaccion, idCampana } });
    return data.length > 0 ? data[0]['existe'] : [{}]
}

const validarLimiteParticipacionesPorUsuario = async (usuario, idCampana) => {
    await sequelize.query(`SELECT SUM(participaHoy) participaHoy FROM (SELECT COUNT(*) participaHoy
    FROM genesis.participante_campana
    WHERE idUsuarioParticipante = :usuario AND idCampana = :idCampana AND CAST(fechaParticipacion AS DATE) = CAST(NOW() AS DATE)) AS sumar;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { usuario, idCampana } });
    return data.length > 0 ? data[0]['participaHoy'] : [{}]
}

const validarlimitetransacciones = async (idParticipante, idTransaccion) => {
    const data = await sequelize.query(`SELECT
                                            SUM(cantidad) cantidad
                                        FROM (SELECT COUNT(idParticipante) cantidad FROM genesis.participante_campana
                                            WHERE idUsuarioParticipante = :idParticipante
                                                AND CAST(fechaParticipacion AS DATE) = CAST(NOW() AS DATE)
                                                AND idCampanaParticipacion = :idTransaccion
                                            UNION ALL
                                        SELECT COUNT(idParticipante) cantidad FROM genesis.participante_campana_adicional
                                        WHERE idUsuarioParticipante = :idParticipante
                                        AND CAST(fechaParticipacion AS DATE) = CAST(NOW() AS DATE)
                                        AND idCampanaParticipacion = :idTransaccion) sumar;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idParticipante, idTransaccion } });
    return data.length > 0 ? data[0]['cantidad'] : [{}]
}


const validarParticipantesRestantes = async (idCampana, idDepto, idMuni) => {
    const data = await sequelize.query(`SELECT COUNT(*) espacio
                                            FROM genesis.det_campana_regiones
                                            WHERE idCampana = :idCampana
                                                AND idDepartamento = :idDepto
                                                AND estado = 1
                                                AND idMunicipio = :idMuni
                                                AND limites > listos;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, idDepto, idMuni } });
    return data.length > 0 ? data[0]['espacio'] : [{}]
}

const actualizarParticipantesRestantes = async (idCampana, idDepto, idMuni) => {
    const data = await sequelize.query(`UPDATE genesis.det_campana_regiones
                                            SET listos = listos + 1
                                            WHERE idCampana = :idCampana
                                                AND idDepartamento = :idDepto
                                                AND estado = 1
                                                AND idMunicipio = :idMuni;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { idCampana, idDepto, idMuni } });
    return data.length > 0 ? { 'status': 201, 'message': 'Datos guardados exitosamente.' } : { 'status': 400, 'message': 'Nop.' }
}

const transaccionesUsuario = async (usuario, numeroRetornar) => {
    const data = await sequelize.query(`UPDATE genesis.det_campana_regiones
                                            SET listos = listos + 1
                                            WHERE idCampana = :idCampana
                                                AND idDepartamento = :idDepto
                                                AND estado = 1
                                                AND idMunicipio = :idMuni;`
        , { raw: false, type: QueryTypes.SELECT, replacements: { usuario, numeroRetornar } });
    return data.length > 0 ? data[0]['espacio'] : [{}]
}


module.exports = { check_auth_client, auth, getTestTransaccion, CampanasActualesActivas, CampanasActualesActivasTercero, CampanaTransaccionesValidas, CampanaPremiosRetornarRandom, CampanaPremiosRetornarTodas, CampanaPremiosInfoCliente, ValidarNumeroTelefono, CampanaNumerosRestringidos, validarUnicaTransaccion, validarUnicaTransaccion2, validarUnicaTransaccion3, validarLimiteParticipacionesPorUsuario, validarlimitetransacciones, validarParticipantesRestantes, actualizarParticipantesRestantes }