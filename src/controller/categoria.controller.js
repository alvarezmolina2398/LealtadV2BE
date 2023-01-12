const { Categoria } = require('../models/categoria');


//controllador paa obtener la lista de Categoriaes
const GetCategorias = async (req, res) => {
    try {
        const trx = await Categoria.findAll({
            where: {
                estado: 1
            }
        });
        res.json(trx)
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });
    }

}


//controllador para agregar nuevas Categoriaes
const AddCategoria = async (req, res) => {

    try {
        const { nombre } = req.body;
        await Categoria.create({
            nombre
        })
        res.json({ code: 'ok', message: 'Categoria creada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Categoria.' });
    }

}


//controllador para actualizar Categoriaes
const UpdateCategoria = async (req, res) => {

    try {
        const { nombre } = req.body;
        const { id } = req.params
        await Categoria.update({
            nombre
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Categoria actualizada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Categoria.' });
    }

}


//controllador para actualizar Categoriaes
const DeleteCategoria = async (req, res) => {

    try {
        const { id } = req.params
        await Categoria.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Categoria inhabilitada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Categoria.' });
    }

}


const GetCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Categoria.findByPk(id);
        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Categoria.' });
    }

}

module.exports = { GetCategorias, AddCategoria, UpdateCategoria, DeleteCategoria, GetCategoriaById }