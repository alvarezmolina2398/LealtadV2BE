const cron = require('node-cron');
const { Op } = require('sequelize');
const { Campania } = require('../models/campanias');
const env = require("../bin/env");
const sendEmail = require('./sendEmail');

// Función para validar emails
function validateEmails(emails) {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emails && emails.split(',').every(email => emailPattern.test(email.trim().toLowerCase()));
}

// Tarea programada para revisar y notificar sobre campañas
const tareaVerificarCampanias = cron.schedule('13 56 * * *', async () => {
    console.log('Ejecutando tarea diaria a las 13:56 AM');
    const hoy = new Date();
    const cincoDiasDespues = new Date(hoy.getTime() + 5 * 24 * 60 * 60 * 1000);

    const campanias = await Campania.findAll({
        where: {
            fechaFin: { [Op.between]: [hoy, cincoDiasDespues] }
        },
        attributes: ['id', 'nombre', 'fechaFin', 'emails']
    });

    for (let campania of campanias) {
        const diasRestantes = Math.ceil((campania.fechaFin - hoy) / (1000 * 60 * 60 * 24));
        if (validateEmails(campania.emails)) {
            const subject = `Aviso de finalización de campaña: ${campania.nombre}`;
            const html = `<p>La Campaña <strong>${campania.nombre}</strong> vencerá en ${diasRestantes} días (${campania.fechaFin.toLocaleDateString()}).</p>`;
            try {
                const info = await sendEmail({
                    from: env.EMAIL_USER,
                    to: campania.emails,
                    subject: subject,
                    html: html
                });
                console.log('Correo enviado:', info.response);
            } catch (error) {
                console.error('Error al enviar correo:', error);
            }
        } else {
            console.log('Los correos deben separarse por coma ","');
        }
    }
});
module.exports = { tareaVerificarCampanias };
