const { Profecion } = require('../models/profecion.js');


//controllador paa obtener la lista de Columnaes
const GetProfecion = async (req, res) => {
    try {
        const trx = await Profecion.findAll({
            
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar obtener la lista de profesiones.' });
    }
}








const AddProfecion= async (req, res) => {
    try {
        const { descripcion,proyecto} = req.body;

        await Profecion.create({
            descripcion,
            proyecto
          
        })
        res.json({ code: 'ok', message: 'Profesion creada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la profesion.' });
    }
}






// controllador para actualizar Menus
const UpdateProfecion = async (req, res) => {
    try {
        const { descripcion, proyecto } = req.body;
        const { id } = req.params
        await Profecion.update({
            descripcion,
            proyecto
           
        }, {
            where: {
                id: id
            }
        });
        res.json({ code: 'ok', message: 'Profesion actualizada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar actualizar la Profesion.' });
    }
}

//controllador para eliminar Menus
const DeleteProfecion = async (req, res) => {
    try {
        const { id } = req.params
        await Profecion.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });

    res.json({ code: 'ok', message: 'Profesion inhabilitada con exito' });
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar deshabilitar la Profesion.' });
    }
}

//obtener la Profecion por su id 
const GetProfecionById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Profecion.findByPk(id,{
           
            where: {
                estado: 1
            }
        });

        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un error al intentar buscar la Profesion.' });
    }
}

module.exports = {GetProfecion, AddProfecion, UpdateProfecion, DeleteProfecion, GetProfecionById}