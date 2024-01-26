const {Departamento} = require('../models/departamento');

//Obtener lista de departamentos
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

//Agregar departamentos
const AddDepartamentos = async (req, res) => {
    try{

        const {nombre} =req.body;
        await Departamento.create({
            nombre
        });

        res.json({code: 'ok', message: 'Departamento creado con exito.'});

    } catch(e){
        res.status(403);
        res.send({errors: 'Ha ocurrido un error al intetar ingresar el departamento.'})
    }
}

//Acutaliza categoria
const UpdateDepartamento = async (req, res) => {
    try{

        const {nombre} = req.body;
        const {id} = req.params;

        await Departamento.update({
            nombre
        }, {
            where: {
                id: id
            }
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

module.exports = {GetDepartamentos, AddDepartamentos, UpdateDepartamento, DeleteDepartamento, GetDepartamentobyId}