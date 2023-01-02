const { Premio } = require('../models/premio')


//controllador paa obtener la lista de transacciones
const GetPremios = async (req, res) => {
    try {
        const trx = await Premio.findAll({
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar agregar el premio.' });
    }

}


//controllador para agregar nuevos Premios
const AddPremio = async (req, res) => {

    try {
        const { descripcion, nombre, tipo, link, claveSecreta, idTransaccion } = req.body;
        await Premio.create({
            descripcion,
            nombre,
            tipo,
            link,
            claveSecreta,
            idTransaccion
        })
        res.json({ code: 'ok', message: 'Premio creado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar agregar el premio.' });
    }

}


//controllador para actualizar los premios
const UpdatePremio = async (req, res) => {

    try {
        const { descripcion, nombre, tipo, link, claveSecreta, idTransaccion} = req.body;
        const {id} = req.params
        await Premio.update({
            descripcion,
            nombre,
            tipo,
            link,
            claveSecreta,
            idTransaccion
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Premio actualizado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar agregar el premio.' });
    }

}


//controllador para actualizar transacciones
const DeletePremio = async (req, res) => {

    try {
        const {id} = req.params
        await Premio.update({
            estado : 0
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Premio inhabilitado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el premio.' });
    }

}


const GetPremioById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Transaccion.findByPk(id);
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el premio.' });
    }

}


module.exports = { GetPremios, AddPremio, UpdatePremio, DeletePremio, GetPremioById }