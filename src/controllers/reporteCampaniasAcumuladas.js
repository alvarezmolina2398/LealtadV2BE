const { pronet, sequelize, Op } = require("../database/database");
const { CampaniasNumeros } = require("../models/campanianumero");
const { CampaniaRegiones } = require("../models/campaniaregions")
const { regionesValidasCampania } = require("../controllers/emuladorUsuarioController")

const fechaminimavalida = async (req, res) => {

    const query = 
    `
        SELECT MIN(fechaInicio) AS fechaApartir FROM lealtadv2.campania WHERE fechaFin >= CAST(NOW() AS DATE)
    `
    try {
        const result = await sequelize.query(query, {
            replacements: { },
            type: sequelize.QueryTypes.SELECT
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error en obtener fechaminimavalida:', error);
        return res.status(500).json({ error: 'Error al obtener la fecha minivavalida' });
        // throw error;
    };
}

// const fechamaximavalida = async (req, res) => {
//     try {

//     } catch (error) {

//     }
// }


// const reporteClientesContraCampanas = async (req, res) => {

//     try {
//         if (req.method !== 'GET') {
//             return res.status(400).json({ message: 'Método HTTP no válido' });
//         }

//         // Autenticación y fechas válidas (ajustar según la implementación real)
//         const authData = await AuthModel.verifyToken(req.token); // Suponiendo que existe algún modelo para autenticación
//         const { fechaMin, fechaMax } = await CampanaModel.getValidCampaignDates();

//         // Obtención de participantes y campañas
//         const participantes = await CampanaModel.getActiveParticipants(fechaMin, fechaMax);
//         const campanasActivas = await ApiPremioModel.getActiveCampaigns();

//         // Preparar la respuesta
//         const respuesta = [];

//         for (let participante of participantes) {
//             const { idUsuario, telefono, nombre } = participante; // Asumiendo que estos datos están disponibles
//             const detallesCliente = await ApiPremioModel.getCustomerDetails(idUsuario);
//             const detallesUsuario = await ApiPremioModel.getUserDetails(idUsuario);

//             for (let campana of campanasActivas) {
//                 const { fechaInicio, fechaFin, edadMin, edadMax, generoRequerido } = campana; // Asumiendo estructura de campana

//                 // Verificación de número permitido
//                 const esNumeroPermitido = await ApiPremioModel.isNumberAllowed(telefono, campana.id);

//                 if (esNumeroPermitido && detallesUsuario.fechaCreacion >= fechaInicio && detallesUsuario.genero === generoRequerido) {
//                     // Verificar regiones válidas y participaciones
//                     const regionesValidas = await RegionesModel.getValidRegionsForCampaign(campana.id);
//                     const esRegionValida = regionesValidas.some(region => region.id === detallesUsuario.regionId);

//                     if (esRegionValida) {
//                         const limiteParticipaciones = await CampanaModel.getParticipationLimit(idUsuario, campana.id);

//                         // Tratamiento de transacciones (ajustar según lógica real)
//                         const transaccionesValidas = await ApiPremioModel.getValidTransactionsForCampaign(idUsuario, campana.id);

//                         // Decisión de participación
//                         if (transaccionesValidas.length >= limiteParticipaciones) {
//                             respuesta.push({
//                                 campaniaId: campania.id,
//                                 usuarioId: idUsuario,
//                                 elegible: true
//                             });
//                         }
//                     }
//                 }
//             }
//         }

//         res.status(200).json(respuesta);
//     } catch (error) {
//         console.error("Error en reporteClientesContraCampanas:", error);
//         res.status(500).json({ message: "Error interno del servidor" });
//     }
// }

module.exports = {

    // reporteClientesContraCampanas,
    fechaminimavalida,

}