const cron = require('node-cron');
const {sendEmail} = require('./sendEmail.js');
const {Campania} = require('../models/campanias');
const {generarReporteCampaniaContraClientes, generarReporteClientesParticipando} = require('./generarReportes.js');


const taskSendEmail = cron.schedule('0 1 * * *', async () => {
    
    console.log('running a task every minute');

    //Buscamos si existen alguna campaña configurada para enviar reporte en el dia y hora actual
    const campanias = await Campania.findAll({
        where:{
            diaReporte: new Date().getDate(),
            //horaReporte: new Date().getHours(),
            estado: 1
        }
    })

    //Validamos que se encuentre alguna campaña en el dia y hora configurado

    if(campanias.length > 0){

        const reporteCampaniaContraCliente = await generarReporteCampaniaContraClientes();
        //const reporteClientesParticipando = await generarReporteClientesParticipando();

        console.log("Estas son las campañas", campanias);

        //si encontraamos una camapaña enviamos el reporte a los correos configurados
        campanias.forEach( async (campania) => {
            //console.log("Estas son las campañas", campania);

            let correos = campania.emails;

            const reports = [
                {
                    filename: 'Campaña_contra_clientes.xlsx',
                    content: reporteCampaniaContraCliente
                },
                {
                    filename: 'Campaña_contra_clientesV2.xlsx',
                    content: reporteCampaniaContraCliente
                }

            ]

            sendEmail(correos, 'Reporte de campaña', 'Reporte de la campaña', reports);

        });

    } else {
        console.log("No hay campañas para enviar reporte");
    }
        
});

module.exports = {taskSendEmail};