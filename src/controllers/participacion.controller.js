const { Participacion } = require("../models/Participacion")



const getParticipaciones = async (req, res) => {
    try {
     
        const participaciones = await Participacion.findAll({
            attributes: ['customerId', 'customerName', 'Idtxt', 'descripcionTrx', 'tipo', 'idTransaccion', 'idCampania', 'etapa', 'valor', 'fecha']
        });
        
      
        res.json(participaciones);
    } catch (error) {
      
        console.error("Error al obtener las participaciones:", error);
        res.status(500).json({ error: 'Ha ocurrido un error al obtener las participaciones.' });
    }
};

const addParticipacion = async (req, res) => {

    const {

        customerId,
        customerName,
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
            customerName,
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
    addParticipacion,
    getParticipaciones 
}