const {  ConfigReferido } = require('../models/configReferidos');

//controllador paa obtener la lista de páginas
const GetConfigReferidos = async (req, res) => {
    try {
        const trx = await ConfigReferido.findAll();
        res.json(trx)
    } catch (error) {
        console.log("este es:"+error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de referidos.' });
    }
}

//controllador para actualizar Menus
const UpdateConfigReferidos = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const { id } = req.params
        await ConfigReferido.update({
            descripcion
        }, {
            where: {
                id: id
            }
        });
        res.json({ code: 'ok', message: 'Referido actualizado con exito' });
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar actualizar al referido.' });
    }
}

//controllador para eliminar Menus
const DeleteConfigReferidos = async (req, res) => {
    try {
        const { id } = req.params
        await ConfigReferido.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });
    res.json({ code: 'ok', message: 'Referido inhabilitado con exito' });
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar deshabilitar al Referido.' });
    }
}

module.exports = {GetConfigReferidos, UpdateConfigReferidos, DeleteConfigReferidos}