const { codigoReferidos } = require('../models/codigoReferidos');
const { ConfigReferido } = require('../models/configReferidos');
const { participacionReferidos } = require('../models/participacionReferidos');


//controllador paa obtener la lista de Columnaes
const GetParticipacionReferidos = async (req, res) => {
    try {
        const trx = await participacionReferidos.findAll({
           // include: { model: ConfigReferido },

            include: { model: codigoReferidos },
            where: {
                estado: 1
            }
        })
        console.log(trx);
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de menus.' });
    }
}

module.exports = {GetParticipacionReferidos}