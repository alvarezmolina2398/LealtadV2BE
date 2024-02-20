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

const getTestTransaccion = async (base, tabla, campo, campoid, idTransaccion) => {

    await sequelize.query(`SELECT * FROM :base.:tabla WHERE :campoid = :idTransaccion;`, { type: QueryTypes.SELECT, replacements: { base, tabla, campo, campoid, idTransaccion } });

}

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
            `, { type: QueryTypes.SELECT });

    } else {

        await sequelize.query(`SELECT
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
            , { type: QueryTypes.SELECT, replacements: { idUsuario } });

    }
}

const CampanasActualesActivasTercero = async () => {

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
                            ORDER BY fechaCreacion DESC;`, { type: QueryTypes.SELECT });

}

const CampanaTransaccionesValidas = async (idCampana) => {

    await sequelize.query(`SELECT idLocal, valorMinimo, valorMaximo
                                FROM genesis.det_campana_participacion dcp
                            INNER JOIN genesis.transacciones t ON t.idTransaccion = dcp.idTransaccion
                            WHERE idCampana = :idCampana AND dcp.estado = 1;`, { type: QueryTypes.SELECT, replacements: { idCampana } });

}

const CampanaPremiosRetornarRandom = async (idCampana, idCampanaRegion) => {

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
                                AND dcp.estado = 1 ORDER BY RAND() LIMIT 1;`, { type: QueryTypes.SELECT, replacements: { idCampana, idCampanaRegion } });

}

const CampanaPremiosRetornarTodas = async (idCampana, idCampanaRegion) => {

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
                                    AND dcp.estado = 1;`, { type: QueryTypes.SELECT, replacements: { idCampana, idCampanaRegion } });

}

const CampanaPremiosInfoCliente = async (base, tabla, campoid, idTransaccion) => {

    await sequelize.query(`SELECT telno, department, municipality
                                    FROM pronet.tbl_customer
                                WHERE customer_id = :idTransaccion;`, { type: QueryTypes.SELECT, replacements: { base, tabla, campoid, idTransaccion } });

}

module.exports = { check_auth_client, auth, getTestTransaccion, CampanasActualesActivas, CampanasActualesActivasTercero, CampanaTransaccionesValidas, CampanaPremiosRetornarRandom, CampanaPremiosRetornarTodas, CampanaPremiosInfoCliente }