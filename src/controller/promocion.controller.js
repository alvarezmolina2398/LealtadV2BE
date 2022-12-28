const { Promocion } = require('../models/promocion');
const { DetallePromocion } = require('../models/detallePromocion');



//controllador paa obtener la lista de Columnaes
const GetPromocion = async (req, res) => {
    try {
        const trx = await Promocion.findAll({
            where: {
                estado: [1, 2, 3]
            }
        })
        res.json(trx)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar consultar las promociones.' });
    }

}


//controllador para agregar nuevas Columnaes
const AddPromocion = async (req, res) => {

    try {
        const {
            nemonico,
            nombre,
            descripcion,
            mesajeExito,
            mesajeFail,
            imgSuccess,
            imgFail,
            fechaInicio,
            fechaFin,
            PremioXcampania,
            estado, 
            codigos
        } = req.body;

        const estadotext = estado === 3 ? 'en Borrador' : '';
        const newPromo = await Promocion.create({
            nemonico,
            nombre,
            descripcion,
            mesajeExito,
            mesajeFail,
            imgSuccess,
            imgFail,
            fechaInicio,
            fechaFin,
            estado,
            PremioXcampania
        });

        const {id} = newPromo.dataValues;
        
        const nuevoArray = codigos.map((item) => ({...item, idPromocion: id}))

        DetallePromocion.bulkCreate(nuevoArray);



        res.json({ code: 'ok', message: 'Promocion creada ' + estadotext + ' con exito' });

    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar Crear la Promocion.' });
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






module.exports = { GetPromocion, AddPromocion }