const { EnviaPremio } = require('../models/enviaPremio.js');
const { Campania } = require('../models/campanias');
// const { EmuladorUsuario } = require('../models/emuladorUsuario');
const { pronet } = require('../database/database');
const { Sequelize } = require('sequelize');




// const generaCampanasUsuarios = async (req, res) => {
//     try {
//         const { referens } = req.params;
//         console.log("Número de referencia:", referens);

//         const refer = await pronet.query(
//             `SELECT customer_id FROM pronet.tbl_customer WHERE customer_reference = :referens LIMIT 1;`,
//             {
//                 replacements: { referens },
//                 type: Sequelize.QueryTypes.SELECT
//             }
//         );

//         console.log("Resultado de la consulta refer:", refer);

//         if (refer && refer.length > 0) {
//             const usuario = await pronet.query(
//                 `SELECT telno, department, municipality FROM pronet.tbl_customer WHERE customer_id = :customer_id`,
//                 {
//                     replacements: { customer_id: refer[0].customer_id },
//                     type: Sequelize.QueryTypes.SELECT
//                 }
//             );

//             console.log("Resultado de la consulta usuario:", usuario);

//             if (usuario && usuario.length > 0) {
//                 // Obtener las campañas activas utilizando el modelo Campania
//                 const campanasActivasEnc = await Campania.findAll({
//                     where: {
//                         estado: 1,
//                     },
//                     attributes: ['id', 'nombre', 'descripcion', 'fechaCreacion', 'fechaRegistro', 'fechaInicio', 'fechaFin', 'diaReporte', 'horaReporte', 'emails', 'edadInicial', 'edadFinal', 'sexo', 'tipoUsuario', 'tituloNotificacion', 'descripcionNotificacion', 'imgPush', 'imgAkisi', 'estado', 'maximoParticipaciones'],
//                     order: [['fechaCreacion', 'DESC']]
//                 });

//                 console.log("Resultado de la consulta campanasActivasEnc:", campanasActivasEnc);

//                 // Asignar valores a cada objeto campana
//                 for (const valorCampanasActivas of campanasActivasEnc) {
//                     valorCampanasActivas.fechaRegistro = valorCampanasActivas.fechaCreacion;
//                     valorCampanasActivas.edadInicial = valorCampanasActivas.edad_inicio;
//                     valorCampanasActivas.edadFinal = valorCampanasActivas.edad_fin;
//                     valorCampanasActivas.tipoUsuario = valorCampanasActivas.tipo_usuario;
//                     valorCampanasActivas.sexo = valorCampanasActivas.sexo;
//                     valorCampanasActivas.usuariosInternos = valorCampanasActivas.usuarios_internos;
//                     valorCampanasActivas.UsuariosAntiguos = valorCampanasActivas.UsuariosAntiguos;
//                     valorCampanasActivas.UsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
//                     valorCampanasActivas.esParaUsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
//                     valorCampanasActivas.idCampana = valorCampanasActivas.idCampana;
//                     valorCampanasActivas.nombreCampana = valorCampanasActivas.nombreCampana;
//                     valorCampanasActivas.filtradoNumero = valorCampanasActivas.filtradoNumero;
//                     valorCampanasActivas.tipoPremiosCampana = valorCampanasActivas.tipoPremio;

//                     if (valorCampanasActivas.imgAkisi) {
//                         valorCampanasActivas.imagen = valorCampanasActivas.imgAkisi;
//                         valorCampanasActivas.imgAkisi = valorCampanasActivas.imgAkisi; // Asignar también a imgAkisi
//                     } else {
//                         valorCampanasActivas.imgAkisi = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfUAAAH0BAMAAADWOqmHAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAwUExURUxpcf+DAIwYm4wYm/6AAYwYm/2BAP1/AYwYm/x/AYwYm/+DAORF...';
//                     }
                   
//                 }

//                 // Filtrar campanas según los criterios requeridos (departamento y municipio)
//                 const campanasFiltradas = campanasActivasEnc.filter(camp => {
//                     const departamentos = camp.departamentos.split(',');
//                     const municipios = camp.municipios.split(',');
//                     return (
//                         departamentos.includes(usuario[0].department) &&
//                         municipios.includes(usuario[0].municipality)
//                     );
//                 });

//                 console.log("Campanas filtradas:", campanasFiltradas);

//                 if (campanasFiltradas.length > 0) {
//                     res.status(200).json(campanasFiltradas);
//                 } else {
//                     res.status(404).json({ message: "No se encontraron campañas para este usuario." });
//                 }
//             } else {
//                 res.status(404).json({ message: "No se encontró ningún usuario con este referens." });
//             }
//         } else {
//             res.status(404).json({ message: "No se encontró ningún usuario con este referens." });
//         }
//     } catch (error) {
//         console.error("Error en generaCampanasUsuarios:", error);
//         res.status(500).json({ message: "Error interno del servidor." });
//     }
// };







//este esta funcional descomentar en caso de mostrar avanses


// const generaCampanasUsuarios = async (req, res) => {
//     try {
//         const { referens } = req.params; 
//         console.log("Número de referencia:", referens);

//         const [refer] = await pronet.query(
//             `SELECT customer_id FROM pronet.tbl_customer WHERE customer_reference = :referens LIMIT 1;`,
//             {
//                 replacements: { referens },
//                 type: Sequelize.QueryTypes.SELECT
//             }
//         );
        
//         console.log("Resultado de la consulta refer:", refer);

//         if (refer) {
//             const [usuario] = await pronet.query(
//                 `SELECT telno, department, municipality FROM pronet.tbl_customer WHERE customer_id = :customer_id`,
//                 {
//                     replacements: { customer_id: refer.customer_id },
//                     type: Sequelize.QueryTypes.SELECT
//                 }
//             );
            
//             console.log("Resultado de la consulta usuario:", usuario); 

//             if (usuario) {
//                 // Obtener las campañas activas utilizando el modelo Campania
//                 const campanasActivasEnc = await Campania.findAll({
//                     where: {
//                         estado: 1,
//                     },
//                     order: [['fechaCreacion', 'DESC']]
//                 });
                
//                 console.log("Resultado de la consulta campanasActivasEnc:", campanasActivasEnc); 

//                 // Asignar valores a cada objeto campana
//                 campanasActivasEnc.forEach(valorCampanasActivas => {
//                     valorCampanasActivas.fechaRegistro = valorCampanasActivas.fechaCreacion;
//                     valorCampanasActivas.edadInicial = valorCampanasActivas.edad_inicio;
//                     valorCampanasActivas.edadFinal = valorCampanasActivas.edad_fin;
//                     valorCampanasActivas.tipoUsuario = valorCampanasActivas.tipo_usuario;
//                     valorCampanasActivas.sexo = valorCampanasActivas.sexo;
//                     valorCampanasActivas.usuariosInternos = valorCampanasActivas.usuarios_internos;
//                     valorCampanasActivas.UsuariosAntiguos = valorCampanasActivas.UsuariosAntiguos;
//                     valorCampanasActivas.UsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
//                     valorCampanasActivas.esParaUsuariosNuevos = valorCampanasActivas.UsuariosNuevos;
//                     valorCampanasActivas.idCampana = valorCampanasActivas.idCampana;
//                     valorCampanasActivas.nombreCampana = valorCampanasActivas.nombreCampana;
//                     valorCampanasActivas.filtradoNumero = valorCampanasActivas.filtradoNumero;
//                     valorCampanasActivas.tipoPremiosCampana = valorCampanasActivas.tipoPremio;

//                 });


//                 res.json({ usuario, campanasActivasEnc });
//             } else {
//                 res.status(404).json({ message: "No se encontró ningún usuario con el ID proporcionado." });
//             }
//         } else {
//             res.status(404).json({ message: "No se encontró ningún usuario con la referencia proporcionada." });
//         }
//     } catch (error) {
//         console.error('Error al obtener el envío:', error);
//         res.status(500).json({ error: 'Ha ocurrido un error al obtener el envío.' });
//     }
// };



// const generaCampanasUsuarios = async (req, res) => {
//     try {
//         const { referens } = req.params; 
//         console.log("Número de referencia:", referens);

//         const [refer] = await pronet.query(
//             `SELECT customer_id FROM pronet.tbl_customer WHERE customer_reference = :referens LIMIT 1;`,
//             {
//                 replacements: { referens },
//                 type: Sequelize.QueryTypes.SELECT
//             }
//         );
        
//         console.log("Resultado de la consulta refer:", refer);

//         if (refer) {
//             const [usuario] = await pronet.query(
//                 `SELECT telno, department, municipality FROM pronet.tbl_customer WHERE customer_id = :customer_id`,
//                 {
//                     replacements: { customer_id: refer.customer_id },
//                     type: Sequelize.QueryTypes.SELECT
//                 }
//             );
            
//             console.log("Resultado de la consulta usuario:", usuario); 

//             if (usuario) {
//                 // Obtener las campañas activas utilizando el modelo Campania
//                 const campanasActivasEnc = await Campania.findAll({
//                     where: {
//                         estado: 1,
//                     },
//                     order: [['fechaCreacion', 'DESC']]
//                 });
                
//                 console.log("Resultado de la consulta campanasActivasEnc:", campanasActivasEnc); 

//                 res.json({ usuario, campanasActivasEnc });
//             } else {
//                 res.status(404).json({ message: "No se encontró ningún usuario con el ID proporcionado." });
//             }
//         } else {
//             res.status(404).json({ message: "No se encontró ningún usuario con la referencia proporcionada." });
//         }
//     } catch (error) {
//         console.error('Error al obtener el envío:', error);
//         res.status(500).json({ error: 'Ha ocurrido un error al obtener el envío.' });
//     }
// };






// esto es para mostrar en caso de que pidan avanzes


const GetNumeroById = async (req, res) => {
    try {
        const { telefono } = req.params; 
        console.log("Número de teléfono recibido:", telefono);

      
        const envio = await EnviaPremio.findOne({
            where: {
                telefono: telefono, 
                estado: 1,
            },
            include: [{
                model: Campania,
                as: 'campaign', 
                attributes: ['nombre'] 
            }]
        });

      
        res.json(envio);
    } catch (error) {
        console.error('Error al obtener el envío:', error);
        // Enviar una respuesta de error si ocurre algún problema
        res.status(403).send({ errors: 'Ha ocurrido un error al obtener el envío.' });
    }
};








module.exports = {
 
    // generaCampanasUsuarios,
    // DeleteEnvio,
    GetNumeroById,
}