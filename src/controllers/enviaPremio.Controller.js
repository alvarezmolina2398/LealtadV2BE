const { EnviaPremio } = require('../models/enviaPremio.js');
const { Campania } = require('../models/campanias');







const GetEnviaPremio = async (req, res) => {
    try {
        console.log("Si llega el método obtener premios");
        const trx = await EnviaPremio.findAll({
            where: {
                estado: 1
            },
            include: [{
                model: Campania,
                as: 'campaign', // Así es como especificamos el alias de la asociación en el modelo EnviaPremio
                attributes: ['nombre'] // Solo seleccionamos el nombre de la campaña para mostrar
            }]
        });

        console.log(trx);
        res.json(trx);
    } catch (error) {
        console.error(error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar obtener la lista de premios.' });
    }
}

// const GetEnviaPremio = async (req, res) => {
//     try {

//         console.log("si llega el metodo obtener premios")
//         const trx = await EnviaPremio.findAll({
//             where: {
//                 estado: 1
//             }
//         });



//         console.log(trx);

//         res.json(trx);
//     } catch (error) {
//         res.status(403);
//         res.send({ errors: 'Ha sucedido un error al intentar obtener la lista de premios.' });
//     }
// }





const AddEnvio= async (req, res) => {
    try {

        const { telefono, campania} = req.body;
        console.log('esta llegando',telefono)

        await EnviaPremio.create({
            telefono,
            campania
          
        })
       
        res.json({ code: 'ok', message: 'profecion creada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la profecion.' });
    }
}








const UpdateEnvio = async (req, res) => {
    try {
        const { telefono } = req.body;
        const { id } = req.params;

        await EnviaPremio.update({
            telefono,
        }, {
            where: {
                id,
            },
        });
        res.json({ code: 'ok', message: 'Envío actualizado con éxito.' });
    } catch (error) {
        res.status(403).send({ errors: 'Ha ocurrido un error al actualizar el envío.' });
    }
};

const DeleteEnvio = async (req, res) => {
    try {
        const { id } = req.params;

        await EnviaPremio.update({
            estado: 0, 
        }, {
            where: {
                id,
            },
        });
        res.json({ code: 'ok', message: 'Envío inhabilitado con éxito.' });
    } catch (error) {
        res.status(403).send({ errors: 'Ha ocurrido un error al inhabilitar el envío.' });
    }
};

const GetEnvioById = async (req, res) => {
    try {
        const { id } = req.params;

        const envio = await EnviaPremio.findByPk(id, {
            where: {
                estado: 1,
            },
        });

        res.json(envio);
    } catch (error) {
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener el envío.' });
    }
};

module.exports = {
    GetEnviaPremio,
    AddEnvio,
    UpdateEnvio,
    DeleteEnvio,
    GetEnvioById,
}