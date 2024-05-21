const {Router} = require('express');
const router = Router();

const {getReporteNoficacionesOffer } = require('../controllers/ReporteNotificaciones.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'ReporteNotificaciones';
//rutas del proyecto
router.post(`/${path}/Notificacion`,getReporteNoficacionesOffer);


module.exports = router;