const { Op } = require('sequelize');
const { codigoReferidos } = require('../models/codigoReferidos');
const { ConfigReferido } = require('../models/configReferidos');
const { participacionReferidos } = require('../models/participacionReferidos');


const GetParticipacionReferidos = async (req, res) => {
    try {
        const { fechaInicial, fechaFinal, campanas } = req.body; // Obtener también las campañas desde el cuerpo de la solicitud

        const date = fechaFinal.split("-");
        const newDate = new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]), 23, 59, 59);

        const trx = await participacionReferidos.findAll({
            include: [{ model: codigoReferidos }],
            where: {
                estado: 1,
                fecha: {
                    [Op.gte]: new Date(fechaInicial),
                    [Op.lte]: newDate
                },
                // Agregar condición para las campañas
                '$codigoReferidos.campana$': campanas // Ajusta el nombre de la columna según tu modelo
            }
        });

        console.log(trx);
        res.json(trx);
    } catch (error) {
        console.error(error);
        res.status(403);
        res.send({ errors: 'Ha sucedido un error al intentar obtener la lista de referidos.' });
    }
}

module.exports = { GetParticipacionReferidos };