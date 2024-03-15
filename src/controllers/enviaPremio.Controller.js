const { EnviaPremio } = require('../models/enviaPremio.js');



const GetEnviaPremio = async (req, res) => {
    try {
        const envios = await EnviaPremio.findAll({
            where: {
                estado: 1 // Mostrar solo envíos activos
            }
        });
        res.json(envios);
    } catch (error) {
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener la lista de envíos.' });
    }
};

const AddEnvio = async (req, res) => {
    try {
        const { telefono } = req.body;

        await EnviaPremio.create({
            telefono,
        });
        res.json({ code: 'ok', message: 'Envío creado con éxito.' });
    } catch (error) {
        res.status(403).send({ errors: 'Ha ocurrido un error al realizar el envío.' });
    }
};

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