const { Menu } = require('../models/menu');
const { Pagina } = require('../models/pagina');

//controllador paa obtener la lista de Columnaes
const GetMenus = async (req, res) => {
    try {
        const trx = await Menu.findAll({
            include: { model: Pagina },
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de menus.' });
    }
}

//controllador para agregar nuevos menus
const AddMenu = async (req, res) => {
    try {
        const { descripcion, pagina } = req.body;

        await Menu.create({
            descripcion,
            idPagina: pagina,
        })
        res.json({ code: 'ok', message: 'Menu creado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el menu.' });
    }
}

//controllador para actualizar Menus
const UpdateMenu = async (req, res) => {
    try {
        const { descripcion } = req.body;
        const { id } = req.params
        await Menu.update({
            descripcion
        }, {
            where: {
                id: id
            }
        });
        res.json({ code: 'ok', message: 'Menu actualizado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar actualizar el menu.' });
    }
}

//controllador para eliminar Menus
const DeleteMenu = async (req, res) => {
    try {
        const { id } = req.params
        await Menu.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });

    res.json({ code: 'ok', message: 'Menu inhabilitado con exito' });
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar deshabilitar el Menu.' });
    }
}


const GetMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Menu.findByPk(id,{
            include: { model: Pagina },
            where: {
                estado: 1
            }
        });

        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un error al intentar realizar el menu.' });
    }
}

module.exports = {GetMenus, AddMenu, UpdateMenu, DeleteMenu, GetMenuById}