const {Router} = require('express');
const router = Router();

const {GetParticipacionReferidos} = require('../controller/reporteReferidos.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'participacionReferidos';
//rutas del proyecto
router.get(`/${path}`,GetParticipacionReferidos);

//exportacion de rutas
module.exports = router;
