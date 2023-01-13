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
const PausarPromocion = async (req, res) => {

    try {
        const { nombre, nemonico, descripcion, mesajeExito, mesajeFail, fechaInicio, fechaFin } = req.body;
        console.log(req.body)
        const { id } = req.params
        await Promocion.update({
            nemonico,
            nombre, 
            descripcion, 
            mesajeExito, 
            mesajeFail, 
            fechaInicio, 
            fechaFin
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Promocion pausada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar pausar la Promocion.' });
    }

}


//controllador para actualizar Columnaes
const ActivarPromocion = async (req, res) => {

    try {
        const { id } = req.params;
        await Promocion.update({
            estado : 1
        }, {
            where: {
                id: id
            }
        });


        res.json({ code: 'ok', message: 'Promocion activada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar activar la Promocion.' });
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
        const {id} = req.params;
        console.log(id)
        const project = await Promocion.findByPk(id);
        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Columna.' });
    }

}






<<<<<<< HEAD
module.exports = { GetPromocion, AddPromocion, PausarPromocion, ActivarPromocion }
=======
module.exports = { GetPromocion, AddPromocion, GetColumnaById, UpdateColumna }
>>>>>>> 3790cbc3123d5272f9b48cefc3ad9c411b11f171
