const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro');
const { Premio } = require('../models/premio');
const { PremioCampania } = require('../models/premioCampania');
const { Presupuesto } = require('../models/presupuesto');



//accion para insertar una nueva trnasaccion
const AddCampania = async (req, res) => {

    const {
        fechaRegistro,
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
            fechaRegistro,
            fechaCreacion : new Date(),
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
            element.idCampania = id;
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
    const { nombre, descripcion, orden, idCampania, tipoParticipacion,parametros, premios, presupuestos } = etapa;

    const newEtatpa = await Etapa.create({
        nombre,
        descripcion,
        orden,
        idCampania,
        tipoParticipacion,
        estado: 1
    });

    const { id } = newEtatpa.dataValues;

    await AddPremios(premios, id)
    await AddParametros(parametros, id)
    await AddPresupuesto(presupuestos, id)
}


const AddParametros = async (parametros, idEtapa) => {

    console.log(parametros)
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

    console.log(presupuestos)
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

const GetcampanasActivasById = async(req, res) => {
    try{

        const {id} = req.params;
        console.log(id)
        const proyect = await Campania.findByPk(id, {
            include: [
                {model: Etapa,
                    include: [
                        {model: Parametro},
                        {model: PremioCampania},
                        {model: Presupuesto}
                    ]
                },
                
            ]
        })
        res.json(proyect);

    } catch (error) {
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar consultar la Campaña.' });
    }
}

const UpdateCampania = async (req, res) => {

    try{

        const {
            fechaRegistro,
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

        const {id} = req.params;

        await Campania.update({
            fechaRegistro,
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
        }, {

            where : {
                id:id
            }
        });

        res.json({code: 'ok', message: 'Campaña Actualizada con exito.'});

    } catch (error) {

        res.status(403);
        res.send({errors: 'Ha ocurrido un error al intentar actualizar la etapa.'});
    }
}

const TestearTransaccion = async (req, res) => {
    try {
        const campania = await Campania.findOne({
            where: {
                id: 1
            }
        });


        const datosPersonales = {
            nombre: 'Jorge Manuel Alvarez Molina',
            sexo: '1',
            tipoUsuario: 1,
            profesion: 1,
            fechaNacimineto: '1998-07-23',
            fechaRegistro: new Date(2022,06,23),
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
        campania.fechaRegistro = new Date();
        let RegistroValidacion = { 'fechaRegistroU': datosPersonales.fechaRegistro, validacion: 0, 'fechaRegistroC': campania.fechaRegistro };
        

        if (campania.fechaRegistro >= datosPersonales.fechaRegistro) {
            RegistroValidacion.validacion = 1;
        } else {
            RegistroValidacion.validacion = 0;
            result = false;
        }


        const dataCompleta = { edadValidacion, RegistroValidacion, result }







        res.json(dataCompleta)
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Campania.' });
    }
}






module.exports = { AddCampania, GetcampanasActivas, TestearTransaccion, GetcampanasActivasById, UpdateCampania }
