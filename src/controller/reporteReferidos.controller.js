const { Op } = require('sequelize');
const { codigoReferidos } = require('../models/codigoReferidos');
const { ConfigReferido } = require('../models/configReferidos');
const { participacionReferidos } = require('../models/participacionReferidos');


//controllador paa obtener la lista de Columnaes
const GetParticipacionReferidos = async (req, res) => {
    try {
        const {  fechaInicial, fechaFinal } = req.body;
        const date = fechaFinal.split("-");
        const newDate = new Date(parseInt(date[0]),parseInt(date[1]), parseInt(date[2]),23,59,59)

        const trx = await participacionReferidos.findAll({

            include: { model: codigoReferidos },
            where: {
                estado: 1,
                fecha: {
                    [Op.gte]: new Date(fechaInicial),
                  },
                  fecha: {
                    [Op.lte]: newDate,
                  },
            }
        })
        console.log(trx);
        res.json(trx)
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de menus.' });
    }
}

module.exports = {GetParticipacionReferidos}