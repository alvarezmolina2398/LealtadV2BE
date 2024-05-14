const {Departamento} = require('../models/departamento');
const {Departamento_Proyectos} = require('../models/departamento_proyectos');
const {Proyectos} = require ('../models/proyectos.model')


const GetDepartamentos = async(req, res) => {
    try{

        const depa = await Departamento.findAll({
            where: {
                estado : 1
            }
        });

        res.json(depa);

    } catch (e) {
        console.error(e);
        res.status(403);
        res.send({errors: 'Ha sucedido un error al intentar realizar la consulta.'})
    }
}

const AddDepartamentos = async (req, res) => {
    try {
        const { nombre, IdLocal } = req.body;

      
        const departamento = await Departamento.create({
            nombre,
            IdLocal
        });

        // Obtener el ID del departamento recién creado
        const departamentoId = departamento.id;

        // Crear entrada en la tabla departamento_proyectos
        await Departamento_Proyectos.create({
            idDepartamento: departamentoId,
            idProyecto: req.body.idProyecto 
        });

        res.json({ code: 'ok', message: 'Departamento creado con exito.' });

    } catch (e) {
        res.status(403);
        res.send({ errors: 'Ha ocurrido un error al intentar ingresar el departamento.' });
    }
}
//Acutaliza categoria
const UpdateDepartamento = async (req, res) => {
    try{

        const {nombre,IdLocal} = req.body;
        
        const {id} = req.params;

        await Departamento.update({
            nombre,
            IdLocal
        },
        
        {
            where: {
                id: id
            }
        });

      
         // Obtener el ID del departamento recién creado
         

         // Crear entrada en la tabla departamento_proyectos
         await Departamento_Proyectos.create({
             idDepartamento: id,
             idProyecto: req.body.idProyecto 
         });
 

        res.json({code: 'ok', message: 'Departamento Actualizado con exito.'});

    } catch (e) {
        res.status(403);
        res.send({errors: 'Ha ocurrido un error al intentar actualizar el departamento.'});
    }
}

//eliminado logico de categoria
const DeleteDepartamento = async (req, res) => {
    try{

        const {id} = req.params;
        console.log(id);

        await Departamento.update({
            estado: 0
        }, {
            where: {
                id: id
            }
        });

        res.json({code: 'ok', message: 'Departamento inhabilitado con exito.'});

    } catch (e) {
        res.status(403);
        res.send({errors: 'Ha ocurrido un error al intentar inhabilitar el departamento.'});
    }
}

//obtener departamentos por el id
const GetDepartamentobyId = async (req, res) => {
    try{
        console.log(req.params)
        const {id} = req.params;
        const depa = await Departamento.findByPk(id);
        res.json(depa);

    } catch(e){
        res.status(403);
        res.send({errors: 'ha sucedido un error al intentar obtener el departamento.'})
    }
}
const GetDepartamentosByProyectoId = async (req, res) => {
    try {
        const { idProyecto } = req.params;

        // Verificar si se proporciona el ID de proyecto
        if (!idProyecto) {
            return res.status(400).json({ error: 'Se requiere proporcionar un ID de proyecto.' });
        }

        // Buscar los departamentos asociados al ID de proyecto proporcionado
        const departamentos = await Departamento.findAll({
            where: {
                estado: 1 // Considerando solo los departamentos activos
            },
            include: [{
                model: Departamento_Proyectos,
                where: {
                    idProyecto: idProyecto
                },
                required: true // Garantizar que solo se devuelvan los departamentos asociados al proyecto
            }]
        });

        // Devolver los departamentos encontrados
        res.json(departamentos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error al intentar obtener los departamentos por el ID de proyecto.' });
    }
};


module.exports = {GetDepartamentos,GetDepartamentosByProyectoId, AddDepartamentos, UpdateDepartamento, DeleteDepartamento, GetDepartamentobyId}