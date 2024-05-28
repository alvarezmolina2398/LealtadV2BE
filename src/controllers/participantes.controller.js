const {Participantes} = require("../models/participantes");
const { TransaccionPremio } = require("../models/transaccionPremio");
const { Campania } = require('../models/campanias');



const getParticipantes = async (req, res) => {
    try {
        const participantes = await Participantes.findAll({
            include: {
                model: Campania,
                attributes: ['nombre', 'descripcion', 'fechaInicio', 'fechaFin','fechaCreacion'] // Incluye los atributos de la campaña que necesitas
            }
        });

        res.json(participantes);
    } catch (error) {
        console.error("Error al obtener las participaciones:", error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener las participaciones.' });
    }
};




module.exports = { getParticipantes };