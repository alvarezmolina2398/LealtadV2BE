const {Router} = require('express');
const { getDatosCupon } = require('../controller/reportPromocion.js');
const router = Router();




const path = 'reportePromocion';

router.post(`/${path}`, getDatosCupon);



module.exports = router