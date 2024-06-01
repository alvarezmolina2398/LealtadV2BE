const { pronet, genesis } = require('../database/database');
const { Campania } = require('../models/campanias');
const { Etapa } = require('../models/etapa');
const { Participacion } = require('../models/Participacion');
const { PremioCampania } = require('../models/premioCampania');
const { Premio } = require('../models/premio');


const { Op } = require('sequelize');

const getParticipacionesActivas = async(req, res) => {
    try {
        const { fecha1, fecha2, } = req.body;

        

        // Realizamos la consulta a la base de datos
        const envio = await Campania.findAll({
            where: {
                [Op.or]: [{ estado: [1, 2, 3] }],
                fechaInicio: {
                    [Op.gte]: fecha1
                },
                fechaFin: {
                    [Op.lte]: fecha2
                },
                estado: 1,
            },
            include: [{
                model: Participacion,
                as: 'participaciones',
                attributes: ['fecha', 'descripcionTrx', 'urlPremio', 'valor', 'idPremio', 'idTransaccion', 'customerId'],
            }]
        });


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
                       
                    },
                    premioDescripcion: p.premio ? p.premio.descripcion : "Sin premio", // Obtén la descripción del premio
                    customerInfo
                });
            }
            newArray.push({
                "id": c.id,
                "nombre": c.nombre,
                "descripcion": c.descripcion,
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
                cu.telno,
                ui.lname,
                ui.fname,
                ui.mname, 
                ui.slname
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

module.exports = { getParticipacionesActivas };