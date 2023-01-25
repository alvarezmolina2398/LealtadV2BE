const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro');
const { PremioCampania } = require('../models/premioCampania');
const { Presupuesto } = require('../models/presupuesto');


//accion para insertar una nueva trnasaccion
const AddCampania = async (req, res) => {

    const {
        fechaCreacion,
        fechaInicio,
        fechaFin,
        nombre,
        descripcion,
        edadInicial,
        edadFinal,
        sexo,
        tipoUsuario,
        tituloNotificacion,
        descripcionNotificacion,
        imgPush,
        imgAkisi,
        etapas,
        maximoParticipaciones
    } = req.body;


    try {
        const newCampains = await Campania.create({
            fechaCreacion,
            fechaInicio,
            fechaFin,
            nombre,
            descripcion,
            edadInicial,
            edadFinal,
            sexo,
            tipoUsuario,
            tituloNotificacion,
            descripcionNotificacion,
            imgPush,
            imgAkisi,
            estado: 1,
            maximoParticipaciones
        });
        const { id } = newCampains.dataValues;



        //     console.log(id)

        etapas.forEach(element => {
            element.idCampana = id;
            AddEtapas(element);
        });

        res.json({ code: 'ok', message: 'Campania creada  con exito' });

    } catch (error) {
        console.error("e" + error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });
    }

}


const AddEtapas = async (etapa) => {
    const { nombre, descripcion, orden, idCampana, tipoParticipacion, parametros, premios, presupuestos } = etapa;

    const newEtatpa = await Etapa.create({
        nombre,
        descripcion,
        orden,
        idCampana,
        tipoParticipacion,
        estado: 1
    });

    const { id } = newEtatpa.dataValues;

    await AddPremios(premios, id)
    await AddParametros(parametros, id)
    await AddPresupuesto(presupuestos, id)
}


const AddParametros = async (parametros, idEtapa) => {
    parametros.map((element, index) => {
        parametros[index].idEtapa = idEtapa
    });
    await Parametro.bulkCreate(parametros);
}

const AddPremios = async (premios, idEtapa) => {
    premios.map((element, index) => {
        premios[index].idEtapa = idEtapa
    });
    await PremioCampania.bulkCreate(premios);
}


const AddPresupuesto = async (presupuestos, idEtapa) => {
    presupuestos.map((element, index) => {
        presupuestos[index].idEtapa = idEtapa
    });
    await Presupuesto.bulkCreate(presupuestos);
}


const GetcampanasActivas = async (req, res) => {
    try {
        const trx = await Campania.findAll({
            where: {
                estado: 1
            }
        });
        res.json(trx)
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de las categorias.' });
    }

}

const TestearTransaccion = async (req, res) => {
    try {
        const campania = await Campania.findOne({
            include: [
                {
                    model: Etapa,
                    include: [
                        {
                            model: Parametro
                        },
                        {
                            model: Presupuesto
                        }
                    ]
                }
            ],
            where: {
                id: 1
            }
        });


        const datosPersonales = {
            nombre: 'Jorge Manuel Alvarez Molina',
            sexo: 1,
            tipoUsuario: 1,
            profesion: 1,
            fechaNacimineto: '1998-07-23',
            fechaRegistro: new Date(2023, 01, 05),
        }



        let result = true;


        //validacion de la edad
        const fechaNacimineto = datosPersonales.fechaNacimineto.split('-');
        const edad = 2023 - parseInt(fechaNacimineto[0]);
        let edadValidacion = { edad, validacion: 0, 'inicial': campania.edadInicial, 'final': campania.edadFinal };

        if (edad >= campania.edadInicial || edad <= campania.edadFinal) {
            edadValidacion.validacion = 1;
        } else {
            edadValidacion.validacion = 0;
            result = false;
        }

        //validacion fecha registro
        campania.fechaRegistro = new Date(2023, 01, 01);
        let RegistroValidacion = { 'fechaRegistroU': format(datosPersonales.fechaRegistro), validacion: 0, 'fechaRegistroC': format(campania.fechaRegistro) };

        if (campania.fechaRegistro <= datosPersonales.fechaRegistro) {
            RegistroValidacion.validacion = 1;
        } else {
            RegistroValidacion.validacion = 0;
            result = false;
        }

        let sexoValidacion = { sexo: datosPersonales.sexo, validacion: 0, sexoCampania: campania.sexo };
        //validacion del sexo del usuario
        if (campania.sexo === 0 || datosPersonales.sexo === campania.sexo) {
            sexoValidacion.validacion = 1;
        } else {
            sexoValidacion.validacion = 0;
            result = false;
        }


        let tipoUsuarioValidacion = { tipoU: datosPersonales.tipoUsuario, validacion: 0, tipoUC: campania.tipoUsuario };

        if (campania.tipoUsuario === 0 || datosPersonales.tipoUsuario === campania.tipoUsuario) {
            tipoUsuarioValidacion.validacion = 1;
        } else {
            tipoUsuarioValidacion.validacion = 0;
            result = false;
        }

        const { etapas } = campania;

        //validacion de las etapas
        const etapaActual = 1;
        const dataEtapaActual = etapas.find(element => element.orden === etapaActual);
        const etapasValidacion = { etapaActual: etapaActual, etapasTotales: etapas.length }




        const { parametros, presupuestos } = dataEtapaActual;

        const validacionPresupuesto = { validacion: 1, presupuesto: presupuestos[0].valor, limiteGanadores :  presupuestos[0].limiteGanadores }

        const validacionParametros = { validacion: 1, parametros, cantParticipaciones: 0 };
        const dataCompleta = { edadValidacion, RegistroValidacion, sexoValidacion, etapasValidacion, tipoUsuarioValidacion, validacionParametros, validacionPresupuesto, result };

        res.json(dataCompleta);
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Campania.' });
    }
}

const format = (inputDate) => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${date}/${month}/${year}`;
}






module.exports = { AddCampania, GetcampanasActivas, TestearTransaccion }
