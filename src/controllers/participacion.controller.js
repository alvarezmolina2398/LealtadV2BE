const { Participacion } = require("../models/Participacion")


const addParticipacion = async (req, res) => {

    const {

        customerId,
        Idtxt,
        descripcionTrx,
        tipo,
        idTransaccion,
        idCampania,
        etapa,
        valor

    } = req.body


    try {
        
        await Participacion.create({
            customerId,
            fecha : new Date(),
            idtxt : Idtxt,
            descripcionTrx,
            tipo,
            idTransaccion,
            idCampania,
            etapa,
            valor
        })

        res.json({ code: 'ok', message: 'Participacion agregada con exito'});

    } catch (error) {
        console.error("e" + error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Participacion.' });
    }
}

module.exports = {
    addParticipacion
}