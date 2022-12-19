const { Columna } = require('../models/columna');


//controllador paa obtener la lista de Columnaes
const GetColumnas = async (req, res) => {
    try {
        const trx = await Columna.findAll({
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}


//controllador para agregar nuevas Columnaes
const AddColumna = async (req, res) => {

    try {
        const { nombre } = req.body;
        await Columna.create({
            nombre
        })
        res.json({ code: 'ok', message: 'Columna creada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}


//controllador para actualizar Columnaes
const UpdateColumna = async (req, res) => {

    try {
        const { nombre } = req.body;
        const { id } = req.params
        await Columna.update({
            nombre
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Columna actualizada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}


//controllador para actualizar Columnaes
const DeleteColumna = async (req, res) => {

    try {
        const { id } = req.params
        await Columna.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Columna inhabilitada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}


const GetColumnaById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Columna.findByPk(id);
        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}






module.exports = { GetColumnas, AddColumna, UpdateColumna, DeleteColumna, GetColumnaById }