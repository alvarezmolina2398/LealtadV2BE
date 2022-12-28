const { Municipio } = require('../models/municipio')


//controllador paa obtener la lista de municipios
const GetMunicipios = async (req, res) => {
    try {
        const trx = await Municipio.findAll({
            where: {
                estado: 1
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el municipio.' });
    }

}


//controllador para agregar nuevos municipios
const AddMunicipio = async (req, res) => {

    try {
        const { nombre, departamento } = req.body;
        await Municipio.create({
            nombre,
            idDepartamento: departamento,
        })
        res.json({ code: 'ok', message: 'Municipio creado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el municipio.' });
    }

}


//controllador para actualizar los municipios
const UpdateMunicipio = async (req, res) => {

    try {
        const { nombre, departamento, } = req.body;
        const {id} = req.params
        await Municipio.update({
            nombre,
            idDepartamento: departamento,
            
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Municipio actualizado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el municipio.' });
    }

}


//controllador para eliminar municipios
const DeleteMunicipio = async (req, res) => {

    try {
        const {id} = req.params
        await Municipio.update({
            estado : 0
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Municipio inhabilitado con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el municipio.' });
    }

}


const GetMunicipioById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Municipio.findByPk(id);
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar el municipio.' });
    }

}



module.exports = { GetMunicipios, AddMunicipio, UpdateMunicipio, DeleteMunicipio, GetMunicipioById }