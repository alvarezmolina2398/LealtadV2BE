const { pronet, genesis } = require('../database/database');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Participacion } = require('../models/Participacion');

const { PremioCampania } = require('../models/premioCampania');
const { Premio } = require('../models/premio');


const { Op } = require('sequelize');



// const getUsuariosNotificacionesOfferCraftSel = async(req, res) => {
//     try {
//         const { idCampanas, fecha1, fecha2 } = req.body;

//         const envio = await Campania.findAll({
//             where: {
//                 id: idCampanas,
//                 fechaInicio: {
//                     [Op.gte]: fecha1
//                 },
//                 fechaFin: {
//                     [Op.lte]: fecha2
//                 },
//                 estado: 1,

//             },
//             include: [{
//                 model: Participacion,
//                 as: 'participaciones',
//                 attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
//                 include: [{
//                     model: Campania,
//                     attributes: ['nombre', 'fechaCreacion']
//                 }],
//                 include: [{
//                     model: Premio, // Cambia el modelo a Premio
//                     attributes: ['descripcion'] // Incluye solo la descripción del premio
//                 }]
//             }]
//         });

//         // Crear un nuevo array con la estructura deseada
//         const newArray = [];
//         for (const c of envio) {
//             const participaciones = [];
//             for (const p of c.participaciones) {
//                 const customerInfo = await getCustomerInfoById(p.customerId);
//                 participaciones.push({
//                     ...p.toJSON(),
//                     campanium: {
//                         "nombre": c.nombre,
//                         "fechaCreacion": c.fechaCreacion
//                     },
//                     premioDescripcion: p.premio ? p.premio.descripcion : "Sin premio", // Obtén la descripción del premio
//                     customerInfo
//                 });
//             }
//             newArray.push({
//                 "id": c.id,
//                 "nombre": c.nombre,
//                 "descripcion": c.descripcion,
//                 "fechaCreacion": c.fechaCreacion,
//                 "fechaRegistro": c.fechaRegistro,
//                 "fechaInicio": c.fechaInicio,
//                 "fechaFin": c.fechaFin,
//                 "diaReporte": c.diaReporte,
//                 "horaReporte": c.horaReporte,
//                 "emails": c.emails,
//                 "edadInicial": c.edadInicial,
//                 "edadFinal": c.edadFinal,
//                 "sexo": c.sexo,
//                 "tipoUsuario": c.tipoUsuario,
//                 "tituloNotificacion": c.tituloNotificacion,
//                 "descripcionNotificacion": c.descripcionNotificacion,
//                 "imgPush": c.imgPush,
//                 "imgAkisi": c.imgAkisi,
//                 "estado": c.estado,
//                 "maximoParticipaciones": c.maximoParticipaciones,
//                 "participaciones": participaciones
//             });
//         }

//         res.json(newArray);
//     } catch (error) {
//         console.error('Error al obtener las campañas:', error);
//         res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campañas.' });
//     }
// };





const getUsuariosNotificacionesOfferCraftSel = async(req, res) => {
    try {
        const { idCampanas, fecha1, fecha2, archivadas } = req.body;
        let whereConditions = {}; // Inicializamos whereConditions fuera del bloque if

        console.log("campaña archivada ", archivadas)

        // Si archivadas es igual a 1, agregamos la condición adicional
        // if (archivadas === 0) {
        //     whereConditions = {
        //         id: idCampanas,
        //         fechaInicio: {
        //             [Op.gte]: fecha1
        //         },
        //         fechaFin: {
        //             [Op.lte]: fecha2
        //         },
        //         estado: 1
        //     };
        // } else if (archivadas === 1) {
        //     whereConditions = {
        //         id: idCampanas,
        //         [Op.or]: [{ estado: [1, 2, 3] }, { esArchivada: 1 }],
        //         fechaInicio: {
        //             [Op.gte]: fecha1
        //         },
        //         fechaFin: {
        //             [Op.lte]: fecha2
        //         },
        //         estado: 1
        //     };
        // }

        // Realizamos la consulta a la base de datos
        const envio = await Campania.findAll({
            where: {
                id: idCampanas,
                [Op.or]: [{ estado: [1, 2, 3] }],
                fechaInicio: {
                    [Op.gte]: fecha1
                },
                fechaFin: {
                    [Op.lte]: fecha2
                },
                estado: 1,
                esArchivada: 0,
            },
            include: [{
                model: Participacion,
                as: 'participaciones',
                attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
                include: [{
                    model: Campania,
                    attributes: ['nombre', 'fechaCreacion']
                }],
                include: [{
                    model: Premio, // Cambia el modelo a Premio
                    attributes: ['descripcion'] // Incluye solo la descripción del premio
                }]
            }]
        });

        if (archivadas == 1) {
            const camapnasArchivadas = await Campania.findAll({
                where: {
                    fechaInicio: {
                        [Op.gte]: fecha1
                    },
                    fechaFin: {
                        [Op.lte]: fecha2
                    },
                    estado: 1,
                    esArchivada: 1
                },
                include: [{
                    model: Participacion,
                    as: 'participaciones',
                    attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
                    include: [{
                        model: Campania,
                        attributes: ['nombre', 'fechaCreacion']
                    }],
                    include: [{
                        model: Premio, // Cambia el modelo a Premio
                        attributes: ['descripcion'] // Incluye solo la descripción del premio
                    }]
                }]
            })

            if (camapnasArchivadas) {
                camapnasArchivadas.map((campania) => envio.push(campania))
            }
        }

        console.log(envio)

        // Formateamos los datos para el envío
        const newArray = [];
        for (const c of envio) {
            const participaciones = [];
            for (const p of c.participaciones) {
                const customerInfo = await getCustomerInfoById(p.customerId);
                participaciones.push({
                    ...p.toJSON(),
                    campanium: {
                        "nombre": c.nombre,
                        "fechaCreacion": c.fechaCreacion
                    },
                    premioDescripcion: p.premio ? p.premio.descripcion : "Sin premio", // Obtén la descripción del premio
                    customerInfo
                });
            }
            newArray.push({
                "id": c.id,
                "nombre": c.nombre,
                "descripcion": c.descripcion,
                "fechaCreacion": c.fechaCreacion,
                "fechaRegistro": c.fechaRegistro,
                "fechaInicio": c.fechaInicio,
                "fechaFin": c.fechaFin,
                "diaReporte": c.diaReporte,
                "horaReporte": c.horaReporte,
                "emails": c.emails,
                "edadInicial": c.edadInicial,
                "edadFinal": c.edadFinal,
                "sexo": c.sexo,
                "tipoUsuario": c.tipoUsuario,
                "tituloNotificacion": c.tituloNotificacion,
                "descripcionNotificacion": c.descripcionNotificacion,
                "imgPush": c.imgPush,
                "imgAkisi": c.imgAkisi,
                "estado": c.estado,
                "maximoParticipaciones": c.maximoParticipaciones,
                "participaciones": participaciones
            });
        }

        res.json(newArray);
    } catch (error) {
        console.error('Error al obtener las campañas:', error);
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campañas.' });
    }
};













const getCustomerInfoById = async(customerId) => {
    try {
        const customerInfo = await pronet.query(`
            SELECT 
                cu.customer_id,
                cu.customer_reference,
                cu.telno,
                ui.lname,
                ui.fname
            FROM 
                pronet.tbl_customer cu
            JOIN 
                pronet.tblUserInformation ui ON cu.telno = ui.userno
            WHERE 
                cu.customer_id = ${customerId}
        `, {
            type: pronet.QueryTypes.SELECT
        });

        return customerInfo[0]; // Devuelve el primer registro encontrado
    } catch (error) {
        console.error('Error al obtener la información del cliente:', error);
        throw new Error('Error al obtener la información del cliente');
    }
};




// const getUsuariosNotificacionesOfferCraftSel = async (req, res) => {
//     try {
//         const { idCampanas, fecha1, fecha2 } = req.body;



//         // const ids = idCampanas.split(',');

//         const envio = await Campania.findAll({
//             where: {
//                 id: idCampanas,
//                 fechaInicio: {
//                     [Op.gte]: fecha1
//                 },
//                 fechaFin: {
//                     [Op.lte]: fecha2
//                 },
//                 estado: 1,
//             },
//             include: [
//                 {
//                     model: Participacion,
//                     as: 'participaciones',
//                     attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
//                     include: [
//                         {
//                             model: Campania,
//                             attributes: ['nombre'] 
//                         }
//                     ]
//                 }
//             ]
//         });

//         // Obtener todas las participaciones de todas las campañas
//         const participaciones = envio.flatMap(c => c.participaciones);

//         // Agrupar las participaciones por customerId
//         const participacionesPorCliente = participaciones.reduce((acc, participacion) => {
//             const { customerId } = participacion;
//             if (!acc[customerId]) {
//                 acc[customerId] = [];
//             }
//             acc[customerId].push(participacion);
//             return acc;
//         }, {});

//         // Obtener la información del cliente por las participaciones agrupadas
//         const customerInfo = await getCustomerInfoById(participacionesPorCliente);

//         res.json({ envio, customerInfo });
//     } catch (error) {
//         console.error('Error al obtener las campañas:', error);
//         res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campañas.' });
//     }
// };


// const getCustomerInfoById = async (participacionesPorCliente) => {
//     try {
//         // Obtener los customerIds de las participaciones agrupadas
//         const customerIds = Object.keys(participacionesPorCliente);

//         // Consulta SQL para obtener la información del cliente
//         const customerInfo = await pronet.query(`
//         SELECT 
//             cu.customer_id,
//             cu.customer_reference,
//             cu.telno,
//             ui.lname,
//             ui.fname
//         FROM 
//             pronet.tbl_customer cu
//         JOIN 
//             pronet.tblUserInformation ui ON cu.telno = ui.userno
//         WHERE 
//             cu.customer_id IN (${customerIds.join(',')})
//         `, {
//             type: pronet.QueryTypes.SELECT
//         });

//         return customerInfo;
//     } catch (error) {
//         console.error('Error al obtener la información del cliente:', error);
//         throw new Error('Error al obtener la información del cliente');
//     }
// };





// const getUsuariosNotificacionesOfferCraftSel = async (req, res) => {
//     try {
//         const { idCampanas, fecha1, fecha2 } = req.params;
//         const ids = idCampanas.split(',');

//         const envio = await Campania.findAll({
//             where: {
//                 id: ids,
//                 fechaInicio: {
//                     [Op.gte]: fecha1
//                 },
//                 fechaFin: {
//                     [Op.lte]: fecha2
//                 },
//                 estado: 1,
//             },
//             include: [
//                 {
//                     model: Participacion,
//                     as: 'participaciones',
//                     attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
//                     include: [
//                         {
//                             model: Campania,
//                             attributes: ['nombre'] 
//                         }
//                     ]
//                 }
//             ]
//         });

//         // Obtener todas las participaciones de todas las campañas
//         const participaciones = envio.flatMap(c => c.participaciones);

//         // Agrupar las participaciones por customerId
//         const participacionesPorCliente = participaciones.reduce((acc, participacion) => {
//             const { customerId } = participacion;
//             if (!acc[customerId]) {
//                 acc[customerId] = [];
//             }
//             acc[customerId].push(participacion);
//             return acc;
//         }, {});

//         // Obtener la información del cliente por las participaciones agrupadas
//         const customerInfo = await getCustomerInfoById(participacionesPorCliente);

//         res.json({ envio, customerInfo });
//     } catch (error) {
//         console.error('Error al obtener las campañas:', error);
//         res.status(403).send({ errors: 'Ha ocurrido un error al obtener las campañas.' });
//     }
// };


// const getCustomerInfoById = async (participacionesPorCliente) => {
//     try {
//         // Obtener los customerIds de las participaciones agrupadas
//         const customerIds = Object.keys(participacionesPorCliente);

//         // Consulta SQL para obtener la información del cliente
//         const customerInfo = await pronet.query(`
//         SELECT 
//             cu.customer_id,
//             cu.customer_reference,
//             cu.telno,
//             ui.lname,
//             ui.fname
//         FROM 
//             pronet.tbl_customer cu
//         JOIN 
//             pronet.tblUserInformation ui ON cu.telno = ui.userno
//         WHERE 
//             cu.customer_id IN (${customerIds.join(',')})
//         `, {
//             type: pronet.QueryTypes.SELECT
//         });

//         return customerInfo;
//     } catch (error) {
//         console.error('Error al obtener la información del cliente:', error);
//         throw new Error('Error al obtener la información del cliente');
//     }
// };





module.exports = { getUsuariosNotificacionesOfferCraftSel };