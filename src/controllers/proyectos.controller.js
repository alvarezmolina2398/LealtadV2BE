const { Proyectos } = require('../models/proyectos.model.js')

const GetProjects = async (req, res) => {
    try {
        const trx = await Proyectos.findAll({
             where: {
                estado: 1
            } 
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        console.log(error)
        res.send({ errors: 'Ha sucedido un error al obtener los proyectos.' });
    }

}

const AddProject = async (req, res) => {

    try {
        console.log('Data recibida en AddProject:', req.body);
        console.log(req.body);
        
        const { descripcion,ruta } = req.body;
        await Proyectos.create({
            descripcion,ruta
        })
        res.json({ code: 'ok', message: 'Proyecto creado con éxito.' });
        console.log('Data recibida en AddProject:', req.body);

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar agregar un nuevo proyecto.' });
    }

}

const UpdateProject = async (req, res) => {

    try {
        const { descripcion, ruta } = req.body;
        const { id } = req.params

        console.log('ID:', id);
        console.log('Descripción:', descripcion);
        console.log('Ruta:', ruta);

        await Proyectos.update({
            descripcion, ruta
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Proyecto actualizado con éxito' });

    } catch (error) {
        res.status(403).send({ errors: 'Ha sucedido un  error al intentar actualizar el proyecto.' });
    }

}

const DeleteProject = async (req, res) => {

    try {
        const { id } = req.params
        console.log("ID del proyecto a eliminar:", id);
        await Proyectos.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Proyecto inhabilitado con éxito.' });

    } catch (error) {
        res.status(403).send({ errors: 'Ha sucedido un  error al intentar realizar el proyecto.' });
    }

}


const GetProjectByID = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Proyectos.findByPk(id);
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el proyecto.' });
    }

}

module.exports = { GetProjects, AddProject, UpdateProject, DeleteProject, GetProjectByID }