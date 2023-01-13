const { Promocion } = require('../models/promocion');
const { DetallePromocion } = require('../models/detallePromocion');
const { PremioPromocion } = require('../models/premioPromocion');



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
            codigos,
            premios
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

        const { id } = newPromo.dataValues;


        if (PremioXcampania != 1) {
            premios.forEach(element => {
                const { cantidad } = element;
                const cantCodigos = codigos.length;

                for (let index = 0; index < cantidad;) {
                    let random = Math.floor(Math.random() * cantCodigos);

                    if (codigos[random].esPremio === 0) {

                        codigos[random] = { ...codigos[random], esPremio: 1 }

                        index++;
                    };

                }
            });

            const nuevoArrarPremios = premios.map((item) => ({ ...item, idPromocion: id }))
            PremioPromocion.bulkCreate(nuevoArrarPremios);

        }

        const nuevoArray = codigos.map((item) => ({ ...item, idPromocion: id }))
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
            estado: 1
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
const UpdatePromocion = async (req, res) => {

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


        res.json({ code: 'ok', message: 'Promocion actualizada con exito' });

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la Promocion.' });
    }

}

const GetPromocionById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id)
        const project = await Promocion.findByPk(id);
        res.json(project)
    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar consultar las Promociones.' });
    }

}

module.exports = { GetPromocion, AddPromocion, PausarPromocion, ActivarPromocion, UpdatePromocion,GetPromocionById }
