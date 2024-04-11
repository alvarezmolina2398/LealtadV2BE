const {Router} = require('express');
const router = Router();

const {GetParticipacionReferidos} = require('../controllers/reporteReferidos.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'reporteReferidos';
//rutas del proyecto
router.post(`/${path}/referidos`,GetParticipacionReferidos);


//exportacion de rutas
module.exports = router;
