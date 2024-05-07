const {Router} = require('express');
const router = Router();

const {GetParticipacionReferidos,getCustomerById } = require('../controllers/reporteReferidos.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'reporteReferidos';
//rutas del proyecto
router.post(`/${path}/referidos`,GetParticipacionReferidos);

router.post(`/${path}/customer`,getCustomerById);
// router.get(`/${path}/participaciones`,getParticipacionesFechas);

//exportacion de rutas
module.exports = router;
