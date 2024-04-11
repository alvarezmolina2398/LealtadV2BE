const { Op, Sequelize } = require('sequelize');
const { asignarCategoria } = require('../models/asignarCategoria');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro');
const { Participacion } = require('../models/Participacion');
const { Participantes } = require('../models/participantes');
const { PremioCampania } = require('../models/premioCampania');
const { Presupuesto } = require('../models/presupuesto');
const { Transaccion } = require('../models/transaccion');
const { Bloqueados} = require('../models/bloqueados');

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
        maximoParticipaciones,
        horaReporte,
        diaReporte,
        emails,
    } = req.body;


    try {
        const newCampains = await Campania.create({
            fechaRegistro: fechaRegistro || null,
            // fechaRegistro,
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
            horaReporte,
            diaReporte,
            emails,
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
    const { nombre, descripcion, orden, idCampania, tipoParticipacion, parametros, premios, presupuestos, intervalo, periodo, valorAcumulado } = etapa;
    const periodoValue = periodo ? parseInt(periodo) : null;
    const intervaloValue = intervalo ? parseInt(intervalo) : null;
    const valorValue = periodo ? parseInt(valorAcumulado) : null;
    const newEtatpa = await Etapa.create({
        nombre,
        descripcion,
        orden,
        idCampania,
        tipoParticipacion,
        // intervalo,
        // periodo,
        intervalo: intervaloValue,
        periodo: periodoValue,
        valorAcumulado: valorValue,
        // valorAcumulado,
        estado: 1
    });

    const { id } = newEtatpa.dataValues;

    await AddPremios(premios, id)
    await AddParametros(parametros, id)
    await AddPresupuesto(presupuestos, id)
}

const addParticipantes = async (Participacion) => {

    console.log(Participacion)
    const { numero, idCampania, estado } = Participacion;

    await Participantes.create({
        numero,
        idCampania,
        estado
    })
}

const addParticipantesBloqueados = async (participacionBloqueados) => {

    //console.log(participacionBloqueados)
    const { numero, idCampania, estado } = participacionBloqueados;

    await Bloqueados.create({
        numero,
        idCampania,
        estado
    });

}


const AddParametros = async (parametros, idEtapa) => {

    // console.log(parametros)
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

    // console.log(presupuestos)
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
        // console.log(id)
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
            maximoParticipaciones,
             horaReporte,
            diaReporte,
            emails,
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
            fechaRegistro: new Date(2023, 1, 31),
        }



        let result = [];


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


            let transaccionesCampanias = parametros.filter(x => x.tipoTransaccion === 'c');



            let transaccionAct = { descripcion: "Recarga de Saldo", valor: 9.00 };
            //muestra las tranacciones
            let TransaccionesValidas = [];
            for (const param of tranasccionesX) {
                const transaccion = await transaccionesValidas(param.idTransaccion);
                const dataTrx = param.dataValues;
                let dataNew = { ...dataTrx, transaccion: transaccion.dataValues }
                TransaccionesValidas.push(dataNew)
            }


            for (const param of transaccionesCampanias) {

            }






            otrasValidaciones = [...otrasValidaciones, edadValidacion, registroValidacion, sexoValidacion, tipoUsuarioValidacion];
            let test = await validacionTransaccion(TransaccionesValidas, transaccionAct, dataEtapaActual, element.id, '123456', dataEtapaActual.valorAcumulado);

            // 
            const validacion = { datosCampania, validacionPresupuesto, premios, validacionEtapa, otrasValidaciones, enviaPremio, TransaccionesValidas, test }

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
            estado: 0
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

const validacionTransaccion = async (transaccionesCampanias, transaccionActual, etapaActual, idCampania, customerId) => {
    let result = null;
    switch (etapaActual.tipoParticipacion) {
        case 1:
            result = await ParticipacionPorParametro(transaccionesCampanias, transaccionActual, idCampania, etapaActual);
            break;


        case 2:
            result = await ParticipacionPorAcumular(transaccionesCampanias, transaccionActual, idCampania, etapaActual);
            break;

        case 3:
            result = await ParticipacionRecurente(transaccionesCampanias, transaccionActual, idCampania, etapaActual);
            break;
        case 4:
            //acumulativa recurente
            break;
        case 5:

            result = await ParticipacionValorAcumulado(transaccionesCampanias, transaccionActual, idCampania, etapaActual, customerId);
            break;
        case 6:
            //conbinar Transaccion
            break;

        default:
            break;
    }
    return result;
}


const ParticipacionPorParametro = async (transaccionesCampanias, transaccion, idCampania, etapaActual) => {
    // console.log(transaccionesCampanias)
    let filterTransaccion = transaccionesCampanias.filter(x => x.transaccion.descripcion.includes(transaccion.descripcion));


    if (filterTransaccion.length === 0) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No aplica Transaccion' }
    }



    const { limiteParticipacion, idTransaccion, tipoTransaccion, nombre, ValorMinimo, ValorMaximo } = filterTransaccion[0];



    const participacionesActuales = cantidadParticipacionCampaniaEtapa(idTransaccion, tipoTransaccion, etapaActual, idCampania)

    if (participacionesActuales >= limiteParticipacion) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'ha superado el maximo de participaciones' }
    }



    if (transaccion.valor > ValorMaximo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'Ha excedido el valor Maximo Permitido' }
    }

    if (transaccion.valor < ValorMinimo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No ha logrado alcanzar el valor minimo Establecido' }
    }



    return { premiado: true, guardaParticipacion: true, result: true }

}


const ParticipacionPorAcumular = async (transaccionesCampanias, transaccion, idCampania, etapaActual) => {
    // console.log(transaccionesCampanias)
    let filterTransaccion = transaccionesCampanias.filter(x => x.transaccion.descripcion.includes(transaccion.descripcion));

    if (filterTransaccion.length === 0) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No aplica Transaccion' }
    }



    const { limiteParticipacion, idTransaccion, tipoTransaccion, ValorMinimo, ValorMaximo } = filterTransaccion[0];




    if (transaccion.valor > ValorMaximo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'Ha excedido el valor Maximo Permitido' }
    }

    if (transaccion.valor < ValorMinimo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No ha logrado alcanzar el valor minimo Establecido' }
    }



    const participacionesActuales = await cantidadParticipacionCampaniaEtapa(idTransaccion, tipoTransaccion, etapaActual.id, idCampania);

    if (participacionesActuales >= limiteParticipacion) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'ha superado el maximo de participaciones' }
    }


    if ((participacionesActuales + 1) < limiteParticipacion) {
        return { premiado: false, guardaParticipacion: true, result: false, message: 'Faltan participaciones para otorgar premio (' + parseInt(participacionesActuales + 1) + '/' + limiteParticipacion + ')' }
    }


    return { premiado: true, guardaParticipacion: true, result: true }

}


const ParticipacionRecurente = async (transaccionesCampanias, transaccion, idCampania, etapaActual) => {
    // console.log(transaccionesCampanias)
    console.log(transaccion)
    let filterTransaccion = transaccionesCampanias.filter(x => x.transaccion.descripcion.includes(transaccion.descripcion));

    if (filterTransaccion.length === 0) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No aplica Transaccion' }
    }



    //const { limiteParticipacion, idTransaccion, tipoTransaccion, nombre, ValorMinimo, ValorMaximo, periodo, intervalo } = filterTransaccion[0];


    


    console.log(etapaActual.periodo)

    switch (etapaActual.periodo) {
        case 1:
            console.log('a')
            await GetParticipacionsXdias(3,  new Date(2023,0,1), new Date(2023,3,1))
            break;

        default:
            break;
    }


    // if (transaccion.valor > ValorMaximo) {
    //     return { premiado: false, guardaParticipacion: false, result: false, message: 'Ha excedido el valor Maximo Permitido' }
    // }

    // if (transaccion.valor < ValorMinimo) {
    //     return { premiado: false, guardaParticipacion: false, result: false, message: 'No ha logrado alcanzar el valor minimo Establecido' }
    // }



    // const participacionesActuales = await cantidadParticipacionCampaniaEtapa(idTransaccion, tipoTransaccion, etapaActual, idCampania);

    // if (participacionesActuales >= limiteParticipacion) {
    //     return { premiado: false, guardaParticipacion: false, result: false, message: 'ha superado el maximo de participaciones' }
    // }


    // if ((participacionesActuales + 1) < limiteParticipacion) {
    //     return { premiado: false, guardaParticipacion: true, result: false, message: 'Faltan participaciones para otorgar premio ('+ parseInt(participacionesActuales + 1) +'/'+limiteParticipacion+')' }
    // }


    return { premiado: true, guardaParticipacion: true, result: true }

}


const ParticipacionValorAcumulado = async (transaccionesCampanias, transaccion, idCampania, etapaActual, customerId) => {
    let filterTransaccion = transaccionesCampanias.filter(x => x.transaccion.descripcion.includes(transaccion.descripcion));


    if (filterTransaccion.length === 0) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No aplica Transaccion' }
    }

    const { ValorMinimo, ValorMaximo, valorAnterior } = filterTransaccion[0];


    if (transaccion.valor > ValorMaximo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'Ha excedido el valor Maximo Permitido' }
    }

    if (transaccion.valor < ValorMinimo) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No ha logrado alcanzar el valor minimo Establecido' }
    }

    const valorActual = await GetValorAcumulado(idCampania, etapaActual.id, valorAnterior, customerId);


    if (valorActual == -1) {
        return { premiado: false, guardaParticipacion: true, result: false, message: 'Ha sucedido un error al consultar los datos' }
    }

    if ((valorActual + transaccion.valor) >= etapaActual.valorAcumulado) {
        return { premiado: true, guardaParticipacion: true, result: true, message: "" }
    } else {
        return { premiado: false, guardaParticipacion: true, result: false, message: 'No a alcanzado la cantidad maxima : (' + (valorActual.toFixed(2) + ' + ' + transaccion.valor.toFixed(2)) + '/ ' + valorAcumulado + ')' }
    }

}

const GetParticipacionsXdias = async (dias, startDate, endDate) => {
    try {


        // const participaciones = await Participacion.findAll({
        //     attributes: [
        //         [Sequelize.literal(`DATE_FORMAT(fecha, '%Y-%m-%d')`), 'fecha'],
        //         [Sequelize.fn('COUNT', Sequelize.col('id')), 'cantidad']
        //     ],
        //     where: {
        //         fecha: {
        //             [Op.between]: [startDate, endDate] // Seleccionar registros dentro del rango de fechas
        //         }
        //     },
        //     group: [Sequelize.literal(`FLOOR(DATEDIFF(DATE_FORMAT(fecha, '%Y-%m-%d'), '${startDate}') / ${dias})`)]

        // });



        // let index = 0;
        // let actuales = [];
        // for (const item of participaciones) {
        //     const { fecha, cantidad } = item.dataValues;

        //     console.log(fecha, cantidad)
        //     index++;
        // }


        // return 0;

        
        const registros = await Participacion.findAll({
            where: {
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: [[Sequelize.fn('date', Sequelize.col('fecha')), 'fecha'], [Sequelize.fn('count', Sequelize.col('*')), 'count']],
            group: [Sequelize.fn('date', Sequelize.col('fecha'))]
        });

        // Comprobar si hay registros en tres días seguidos
        if (registros.length >= 0) {
            let diasSeguidos = 0;
            let ultimaFecha = null;
            let fechaAnterior = null;
            registros.forEach(registro => {
                const fechaActual = new Date(registro.get('fecha'));
                if (fechaAnterior && (fechaActual - fechaAnterior) === 86400000) {
                    diasSeguidos++;
                } else {
                    diasSeguidos = 1;
                    ultimaFecha = fechaActual
                }
                fechaAnterior = fechaActual;
            });


            if (diasSeguidos >= dias) {
                console.log('El registro se hizo en tres días seguidos');
                return  { premiado: true, guardaParticipacion: true, result: true}
            } else {
                console.log('El registro no se hizo en '+ dias +'  días seguidos ' + diasSeguidos + ' de ' + dias);

                return  { premiado: false, guardaParticipacion: true, result: false, message: 'El Registro no se hizo por tres dias seguidos. 1ra Transaccion Agregada' }
            }
        } else {
           // console.log('no hay registro')
           return  { premiado: false, guardaParticipacion: true, result: false, message: '1ra Transaccion Agregada' }
        }

    } catch (error) {
        console.error(error)
        return 0;
    }
}

const GetValorAcumulado = async (idCampania, etapa, ValorAnterior, customerId) => {
    try {




        if (ValorAnterior == 1) {
            const cantidad = await Participacion.sum('valor',
                {
                    where: {
                        customerId: customerId,
                        idCampania: idCampania,

                    }
                });

            return cantidad;

        } else {
            const cantidad = await Participacion.sum('valor',
                {
                    where: {
                        customerId: customerId,
                        idCampania: idCampania,
                        etapa: etapa
                    }
                });


            console.log(cantidad)

            return cantidad != null ? cantidad : 0;
        }




    } catch (error) {
        console.error(error);

        return -1;
    }
}

const cantidadParticipacionCampaniaEtapa = async (idTrx, tipo, etapa, idCampania) => {
    try {

        let cantidad = await Participacion.count({
            where: {
                etapa: etapa,
                idtxt: idTrx,
                tipo: tipo,
                idCampania: idCampania

            }
        })

        return cantidad;

    } catch (error) {
        console.error(error)
        return 0;
    }
}


const GetTransaccionesXCategoria = async (idCategoria) => {
    try {
        const result = await asignarCategoria.findAll({
            include: [
                {
                    model: Transaccion,

                }
            ],
            where: {
                idCategoria: idCategoria
            }
        });

        console.log(result)

        return result;
    } catch (error) {
        console.error(error);
        return [];
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