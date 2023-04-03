const { Op, Sequelize } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../database/database');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Parametro } = require('../models/parametro');
const { Presupuesto } = require('../models/presupuesto');
const { PremioCampania } = require('../models/premioCampania');
const { Transaccion } = require('../models/transaccion');
const { Participacion } = require('../models/Participacion');


//get datos del usuario
const getDatosUsuarios = async (customer_id) => {
    try {
        const sql = `select
        concat(tbu.fname, ' ',tbu.lname) nombre,
        tbc.profession,
        tbu.bdate,
        tbc.created_date,
        tbc.department,
        tbc.municipality,
        tbc.telno,
        tbc.customer_id,
            case
                when tbu.gender  = 'MALE' THEN 1
                when tbu.gender  = 'FEMALE' THEN 2
                ELSE 0
            END genero
        from pronet.tbl_customer tbc
        inner join pronet.tblUserInformation tbu on tbu.userid =  tbc.fk_userid
        where tbc.customer_id = ${customer_id}`;

        const user = await sequelize.query(sql, { type: QueryTypes.SELECT });

        return user;
    } catch (error) {
        console.error(error);
        return [];
    }
}


//testea la participacion 
const testTransaccion = async (req, res) => {
    try {
        const { idTrx, customer_id } = req.body;
        //optiene los datos de la campania
        const campanias = await datosCampania();
        const datosUsuario = await getDatosUsuarios(customer_id);

        //devulve los datos
        let result = [];

        //validacion de usuarios
        let usuarioValidacion = { icono: 'user', nombre: 'usuario', 'inicial': 0, 'final': 0, valorActual: 0 }
        if (datosUsuario != []) {
            usuarioValidacion.valido = 1;
        } else {
            usuarioValidacion.valido = 0;
            enviaPremio = false;
        }

        for (const element of campanias) {
            const datosPersonales = datosUsuario[0];
            let enviaPremio = true;
            const datosCampania = {
                nombre: element.nombre,
                descripcion: element.descripcion
            }

            const { etapas } = element;
            const etapaActual = 1;
            const dataEtapaActual = etapas.find(item => item.orden === etapaActual);
            const { parametros, presupuestos, premioCampania: premios } = dataEtapaActual;

            //valida Presupeusto Actual
            const validacionPresupuesto = {
                validacion: 1,
                presupuesto: parseFloat(presupuestos[0].valor),
                limiteGanadores: presupuestos[0].limiteGanadores,
                presupuestoUtilizado: 150,
                cantParticipaciones: 50,
                presupuestoNew: 150 + parseFloat(premios[0].valor)
            }

            //valida la etapa actual
            const validacionEtapa = {
                etapaActual,
                totalEtapas: etapas.length
            }

            let otrasValidaciones = [];

            //validacion de la edad
            const fechaNacimineto = datosPersonales.bdate.split('-');
            const edad = 2023 - parseInt(fechaNacimineto[0]);
            let edadValidacion = { icono: 'gift', nombre: 'edad', 'inicial': element.edadInicial, 'final': element.edadFinal, valorActual: edad }

            if (edad >= element.edadInicial || edad <= element.edadFinal) {
                edadValidacion.valido = 1;
            } else {
                edadValidacion.valido = 0;
                enviaPremio = false;
            }

            //validacion fecha registro
            let registroValidacion = { icono: 'calendar', nombre: 'Fecha Registro', 'inicial': format(datosPersonales.created_date), 'valorActual': format(new Date(element.fechaRegistro)) };

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
                enviaPremio = false;
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


            const trxValida = await validacionTransaccion(
                TransaccionesValidas,
                transaccionAct,
                dataEtapaActual,
                element.id,
                customer_id,
                dataEtapaActual.valorAcumulado,
                element.fechaInicio,
                element.fechaFin);



            if (trxValida.premiado) {
                enviaPremio = true;
            }

            const validacion = {
                datosCampania,
                validacionPresupuesto,
                premios,
                validacionEtapa,
                otrasValidaciones,
                enviaPremio,
                TransaccionesValidas,
                trxValida
            }

            result = [...result, validacion]
        }
        res.json(result);
    } catch (error) {
        console.error(error)
        res.status(500)
        res.send({ errors: error });
    }
}

//obiene las Campanias
const datosCampania = async () => {
    try {
        return await Campania.findAll({
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
    } catch (error) {
        console.error(error);
        return [];
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

//valida debido al tipo de transaccion
const validacionTransaccion = async (transaccionesCampanias, transaccionActual, etapaActual, idCampania, customerId, valorAcumulado, fechaInicio, fechaFin) => {
    let result = null;
    switch (etapaActual.tipoParticipacion) {
        case 1:
            //p..articipacion por paramentro
            result = await ParticipacionPorParametro(transaccionesCampanias, transaccionActual, idCampania, etapaActual);
            break;
        case 2:
            //acumula participacion
            result = await ParticipacionPorAcumular(transaccionesCampanias, transaccionActual, idCampania, etapaActual);
            break;
        case 3:
            //particioacion recurente 
            result = await ParticipacionRecurente(transaccionesCampanias, transaccionActual, idCampania, etapaActual, fechaInicio, fechaFin);
            break;
        case 4:
            //acumulativa recurente
            break;
        case 5:
            //acumulacion de valor
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

//muestra las participaciones Recurrentes
const ParticipacionRecurente = async (transaccionesCampanias, transaccion, idCampania, etapaActual, fechaInicio, fechaFin) => {
    //filtra las transacciones
    let filterTransaccion = transaccionesCampanias.filter(x => x.transaccion.descripcion.includes(transaccion.descripcion));

    if (filterTransaccion.length === 0) {
        return { premiado: false, guardaParticipacion: false, result: false, message: 'No aplica Transaccion' }
    }

    switch (etapaActual.periodo) {
        case 1:
            return await GetParticipacionsXdias(3, fechaInicio, fechaFin)
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

//obtiene los las participaciones por dias
const GetParticipacionsXdias = async (dias, startDate, endDate) => {
    try {

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
                // console.log('El registro se hizo en tres días seguidos');
                return { premiado: true, guardaParticipacion: true, result: true }
            } else {
                // console.log('El registro no se hizo en '+ dias +'  días seguidos ' + diasSeguidos + ' de ' + dias);

                return { premiado: false, guardaParticipacion: true, result: false, message: 'El Registro no se hizo por tres dias seguidos. 1ra Transaccion Agregada' }
            }
        } else {
            // console.log('no hay registro')
            return { premiado: false, guardaParticipacion: true, result: false, message: '1ra Transaccion Agregada' }
        }

    } catch (error) {
        console.error(error)
        return 0;
    }
}

module.exports = { testTransaccion }