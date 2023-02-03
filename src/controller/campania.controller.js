const { participantesBloqueados, Bloqueados } = require('../models/bloqueados');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro');
const { Participantes } = require('../models/participantes');
const { Premio } = require('../models/premio');
const { PremioCampania } = require('../models/premioCampania');
const { Presupuesto } = require('../models/presupuesto');
const { Transaccion } = require('../models/transaccion');
const { param } = require('../routes/pagina.routes');


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
        Participacion,
        Bloqueados,
        maximoParticipaciones
    } = req.body;


    try {
        const newCampains = await Campania.create({
            fechaRegistro,
            fechaCreacion: new Date(),
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

        Participacion.forEach(element => {
            element.idCampania = id;
            addParticipantes(element);
        });

        Bloqueados.forEach(element => {
            element.idCampania = id;
            addParticipantesBloqueados(element);
        });

        res.json({ code: 'ok', message: 'Campania creada  con exito' });

    } catch (error) {
        console.error("e" + error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Categoria.' });
    }

}


const AddEtapas = async (etapa) => {
    const { nombre, descripcion, orden, idCampania, tipoParticipacion, parametros, premios, presupuestos } = etapa;

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

const addParticipantes = async(Participacion) => {

    console.log(Participacion)
    const { numero, idCampania, estado} = Participacion;

    await Participantes.create({
        numero,
        idCampania,
        estado
    })
}

const addParticipantesBloqueados = async(participacionBloqueados) => {

    console.log(participacionBloqueados)
    const { numero, idCampania, estado} = participacionBloqueados;

    await Bloqueados.create({
        numero,
        idCampania,
        estado
    });
    
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
                estado: [1, 2, 3]
            }
        });
        res.json(trx)
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de las categorias.' });
    }

}

const GetcampanasActivasById = async (req, res) => {
    try {

        const { id } = req.params;
        console.log(id)
        const proyect = await Campania.findByPk(id, {
            include: [
                {
                    model: Etapa,
                    include: [
                        { model: Parametro },
                        { model: PremioCampania },
                        { model: Presupuesto }
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

    try {

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
            maximoParticipaciones
        } = req.body;

        const { id } = req.params;

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
            maximoParticipaciones
        }, {

            where: {
                id: id
            }
        });

        res.json({ code: 'ok', message: 'Campaña Actualizada con exito.' });

    } catch (error) {
        console.log(error)
        res.status(403);
        res.send({ errors: 'Ha ocurrido un error al intentar actualizar la etapa.' });
    }
}

const TestearTransaccion = async (req, res) => {
    try {
        const campanias = await Campania.findAll({
            include: [
                {
                    model: Etapa,
                    include: [
                        {
                            model: Parametro
                        },
                        {
                            model: Presupuesto
                        },
                        {
                            model: PremioCampania
                        }
                    ]
                }
            ],
            where: {
                estado: 1,
            }
        });




        const datosPersonales = {
            nombre: 'Jorge Manuel Alvarez Molina',
            sexo: 1,
            tipoUsuario: 1,
            profesion: 1,
            fechaNacimineto: '1998-07-23',
            fechaRegistro: new Date(2023, 01, 31),
        }



        let result = [];


        // campanias.forEach(async element => {



        // });


        for (const element of campanias) {
            let enviaPremio = true;

            const datosCampania = {
                nombre: element.nombre,
                descripcion: element.descripcion
            }




            const { etapas } = element;
            const etapaActual = 1;
            const dataEtapaActual = etapas.find(item => item.orden === etapaActual);
            const { parametros, presupuestos, premioCampania: premios } = dataEtapaActual;




            const validacionPresupuesto = {
                validacion: 1,
                presupuesto: parseFloat(presupuestos[0].valor),
                limiteGanadores: presupuestos[0].limiteGanadores,
                presupuestoUtilizado: 150,
                cantParticipaciones: 50,
                presupuestoNew: 150 + parseFloat(premios[0].valor)
            }


            const validacionEtapa = {
                etapaActual,
                totalEtapas: etapas.length
            }


            let otrasValidaciones = [];


            //validacion de la edad
            const fechaNacimineto = datosPersonales.fechaNacimineto.split('-');
            const edad = 2023 - parseInt(fechaNacimineto[0]);
            let edadValidacion = { icono: 'gift', nombre: 'edad', 'inicial': element.edadInicial, 'final': element.edadFinal, valorActual: edad }

            if (edad >= element.edadInicial || edad <= element.edadFinal) {
                edadValidacion.valido = 1;
            } else {
                edadValidacion.valido = 0;
                enviaPremio = false;
            }




            //validacion fecha registro
            let registroValidacion = { icono: 'calendar', nombre: 'Fecha Registro', 'inicial': format(datosPersonales.fechaRegistro), 'valorActual': format(new Date(element.fechaRegistro)) };

            if (new Date(2023, 0, 1) <= datosPersonales.fechaRegistro) {
                registroValidacion.valido = 1;
            } else {
                registroValidacion.valido = 0;
                enviaPremio = false;
            }


            //validacion del sexo del usuario
            let generos = ['Todos', 'Masculino', 'Femenino']
            let sexoValidacion = { icono: 'user-check', nombre: 'Genero', 'inicial': generos[element.sexo], 'final': "", valorActual: generos[datosPersonales.sexo] };

            if (element.sexo === 0 || datosPersonales.sexo === element.sexo) {
                sexoValidacion.valido = 1;
            } else {
                sexoValidacion.valido = 0;
                enviaPremio = false;
            }


            //validacion Tipo Usuarop
            let tiposUsuarios = ["TODOS", "Adquiriente", "Final"]

            let tipoUsuarioValidacion = { icono: 'user', nombre: 'Tipo Usuario', 'inicial': tiposUsuarios[element.tipoUsuario], 'final': "", valorActual: tiposUsuarios[datosPersonales.tipoUsuario] };

            if (element.tipoUsuario === 0 || datosPersonales.tipoUsuario === element.tipoUsuario) {
                tipoUsuarioValidacion.valido = 1;
            } else {
                tipoUsuarioValidacion.valido = 0;
                result = false;
            }


            let tranasccionesX = parametros.filter(x => x.tipoTransaccion === 't');


            //muestra las tranacciones
            let TransaccionesValidas = [];
            for (const param of tranasccionesX) {
                const transaccion = await transaccionesValidas(param.idTransaccion);
                const dataTrx = param.dataValues;
                let dataNew = { ...dataTrx, transaccion: transaccion.dataValues }
                TransaccionesValidas.push(dataNew)
            }

            otrasValidaciones = [...otrasValidaciones, edadValidacion, registroValidacion, sexoValidacion, tipoUsuarioValidacion];


            // 
            const validacion = { datosCampania, validacionPresupuesto, premios, validacionEtapa, otrasValidaciones, enviaPremio, TransaccionesValidas }

            result = [...result, validacion]
        }



        res.json(result);
    } catch (error) {
        console.error(error)
        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar realizar la consulta de Campania.' });
    }
}




//devuelve la lista de transacciones validas
const transaccionesValidas = async (id) => {
    try {
        const transaccion = await Transaccion.findOne({ where: { id: id } });
        // console.log(transaccion.dataValues);
        return transaccion;
    } catch (error) {
        console.log(error)
        return [];
    }
}

//formatea la fecha
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

//metodo para pausar campanias
const PausarCampaña = async (req, res) => {

    try {

        const { id } = req.params;

        await Campania.update({
            estado: 2
        }, {

            where: {
                id: id
            }
        });

        res.json({ code: 'ok', message: 'Promocion pausada con exito' })

    } catch (error) {

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar pausar la Campaña.' });

    }
}


//metodo para activas campanias
const ActivarCampaña = async (req, res) => {

    try {

        const { id } = req.params;

        await Campania.update({
            estado: 1
        }, {

            where: {
                id: id
            }
        });

        res.json({ code: 'ok', message: 'Promocion activada con exito' })

    } catch (error) {

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar activar la Campaña.' });

    }
}

const DeleteCampania = async (req, res) => {

    try {

        const { id } = req.params;

        await Campania.update({
            estado: 3
        }, {

            where: {
                id: id
            }

        })

        res.json({ code: 'ok', message: 'Promocion deshabilitada con exito' });

    } catch (error) {

        res.status(403)
        res.send({ errors: 'Ha sucedido un  error al intentar deshabilitar la campaña.' });

    }

}



module.exports = {
    AddCampania,
    GetcampanasActivas,
    TestearTransaccion,
    GetcampanasActivasById,
    UpdateCampania,
    PausarCampaña,
    ActivarCampaña,
    DeleteCampania
}
