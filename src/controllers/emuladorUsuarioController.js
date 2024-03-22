const { EnviaPremio } = require('../models/enviaPremio.js');
const { Campania } = require('../models/campanias');
// const { emuladorUsuario } = require('../models/emuladorUsuario');



// const GetNumeroById = async (req, res) => {
//     try {
//         const { telno } = req.params; // Obtener el número de teléfono del parámetro
//         console.log("Número de teléfono recibido:", telno);

//         // Realizar la búsqueda en la base de datos utilizando el número de teléfono
//         const envio = await emuladorUsuario.findOne({
//             where: {
//                 telno: telno, // Buscar por el número de teléfono
             
//             },
//             // include: [{
//             //     model: Campania,
//             //     as: 'campaign', // Así es como especificamos el alias de la asociación en el modelo EnviaPremio
//             //     attributes: ['nombre'] // Solo seleccionamos el nombre de la campaña para mostrar
//             // }]
//         });

//         // Enviar la respuesta JSON con los datos encontrados
//         res.json(envio);
//     } catch (error) {
//         console.error('Error al obtener el envío:', error);
//         // Enviar una respuesta de error si ocurre algún problema
//         res.status(403).send({ errors: 'Ha ocurrido un error al obtener el envío.' });
//     }
// };


const GetNumeroById = async (req, res) => {
    try {
        const { telefono } = req.params; // Obtener el número de teléfono del parámetro
        console.log("Número de teléfono recibido:", telefono);

        // Realizar la búsqueda en la base de datos utilizando el número de teléfono
        const envio = await EnviaPremio.findOne({
            where: {
                telefono: telefono, // Buscar por el número de teléfono
                estado: 1,
            },
            include: [{
                model: Campania,
                as: 'campaign', // Así es como especificamos el alias de la asociación en el modelo EnviaPremio
                attributes: ['nombre'] // Solo seleccionamos el nombre de la campaña para mostrar
            }]
        });

        // Enviar la respuesta JSON con los datos encontrados
        res.json(envio);
    } catch (error) {
        console.error('Error al obtener el envío:', error);
        // Enviar una respuesta de error si ocurre algún problema
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener el envío.' });
    }
};






// const DeleteEnvio = async(req, res) => {
//     try {
//         const { id } = req.params;

//         await EnviaPremio.update({
//             estado: 0,
//         }, {
//             where: {
//                 id,
//             },
//         });
//         res.json({ code: 'ok', message: 'Envío inhabilitado con éxito.' });
//     } catch (error) {
//         res.status(403).send({ errors: 'Ha ocurrido un error al inhabilitar el envío.' });
//     }
// };




module.exports = {
 
    // DeleteEnvio,
    GetNumeroById,
}