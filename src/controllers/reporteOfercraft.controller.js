const { pronet, genesis } = require('../database/database');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Participacion } = require('../models/Participacion');

const { PremioCampania } = require('../models/premioCampania');
const { Premio } = require('../models/premio');

const { Op } = require('sequelize');

const getUsuariosNotificacionesOfferCraftSel = async (req, res) => {
    try {
        const { idCampanas, fecha1, fecha2 } = req.params;
        const ids = idCampanas.split(',');

        const envio = await Campania.findAll({
            where: {
                id: ids,
                fechaInicio: {
                    [Op.gte]: fecha1
                },
                fechaFin: {
                    [Op.lte]: fecha2
                },
                estado: 1,
            },
            include: [
                {
                    model: Participacion,
                    attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion'],
                    include: [
                        {
                            model: Campania,
                            attributes: ['nombre'] 
                        }
                    ]
                }
            ]
        });

        res.json(envio);
    } catch (error) {
        console.error('Error al obtener las campañas:', error);
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campañas.' });
    }
};





// const getUsuariosNotificacionesOfferCraftSel = async(req, res) => {
//     try {
//         const { idCampanas, fecha1, fecha2 } = req.params;
//         const ids = idCampanas.split(',');

//         const envio = await Campania.findAll({
//             where: {
//                 id: ids,
//                 fechaInicio: {
//                     [Op.gte]: fecha1
//                 },
//                 fechaFin: {
//                     [Op.lte]: fecha2
//                 },
//                 estado: 1,
//             },
//             include: [
//                 {
//                     model: Participacion,
                   
//                 },

//             ]
//         });

//         res.json(envio);
//     } catch (error) {
//         console.error('Error al obtener las campanias:', error);
//         res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campanias.' });
//     }
// };

module.exports = { getUsuariosNotificacionesOfferCraftSel };