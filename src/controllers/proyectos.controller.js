const { Proyectos } = require('../models/proyectos.model.js');
const { Departamento_Proyectos } = require('../models/departamento_proyectos');
const { Departamento } = require('../models/departamento');
const { Municipio } = require('../models/municipio');

const GetProjects = async (req, res) => {
    try {
        const proyectos = await Proyectos.findAll({
            where: {
                estado: 1
            }
        });
        res.json(proyectos);
    } catch (error) {
        console.log(error);
        res.status(403).send({ errors: 'Ha sucedido un error al obtener los proyectos.' });
    }
};
const AddProject = async (req, res) => {
    try {
        console.log('Data recibida en AddProject:', req.body);
        const { descripcion, ruta, localidades } = req.body;
        
        // Crear el proyecto
        const proyecto = await Proyectos.create({
            descripcion,
            ruta
        });

        // Obtener el ID del proyecto recién creado
        const proyectoId = proyecto.id;

        // Crear nuevas entradas en la tabla departamento_proyectos para los departamentos asociados al proyecto
        for (const localidad of localidades) {
            await Departamento_Proyectos.create({
                idDepartamento: localidad.departamentoId,
                idProyecto: proyectoId,
                idMunicipio: localidad.municipioId
            });
        }

        res.json({ code: 'ok', message: 'Proyecto creado con éxito.' });
        console.log('Proyecto creado con éxito:', proyecto);
    } catch (error) {
        console.log(error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar agregar un nuevo proyecto.' });
    }
};







const UpdateProject = async (req, res) => {
    try {
        console.log('Data recibida en UpdateProject:', req.body);
        const { id, descripcion, ruta, localidades } = req.body;
        
        // Verificar que el ID del proyecto esté presente en la solicitud
        if (!id) {
            return res.status(400).json({ errors: 'El ID del proyecto es requerido.' });
        }

        // Encontrar el proyecto existente
        const proyecto = await Proyectos.findByPk(id);
        
        if (!proyecto) {
            return res.status(404).json({ errors: 'Proyecto no encontrado.' });
        }

        // Actualizar el proyecto
        proyecto.descripcion = descripcion;
        proyecto.ruta = ruta;
        await proyecto.save();

        // Eliminar las entradas antiguas en la tabla departamento_proyectos
        await Departamento_Proyectos.destroy({
            where: {
                idProyecto: id
            }
        });

        // Crear nuevas entradas en la tabla departamento_proyectos para los departamentos asociados al proyecto
        for (const localidad of localidades) {
            await Departamento_Proyectos.create({
                idDepartamento: localidad.departamentoId,
                idProyecto: id,
                idMunicipio: localidad.municipioId
            });
        }

        res.json({ code: 'ok', message: 'Proyecto actualizado con éxito.' });
        console.log('Proyecto actualizado con éxito:', proyecto);
    } catch (error) {
        console.log(error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar actualizar el proyecto.' });
    }
};








const DeleteProject = async (req, res) => {
    try {
        const { id } = req.params;
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
        console.log(error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar realizar el proyecto.' });
    }
};

const GetProjectByID = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Proyectos.findByPk(id, {
            include: {
                model: Departamento_Proyectos,
                include: [
                    {
                        model: Departamento
                    },
                    {
                        model: Municipio
                    }
                ]
            }
        });
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(403).send({ errors: 'Ha sucedido un error al intentar realizar el proyecto.' });
    }
};

module.exports = { GetProjects, AddProject, UpdateProject, DeleteProject, GetProjectByID };
