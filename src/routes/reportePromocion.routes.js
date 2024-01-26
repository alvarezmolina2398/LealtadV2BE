const {Router} = require('express');
const { getDatosCupon } = require('../controllers/reportPromocion.js');
const router = Router();




const path = 'reportePromocion';

router.post(`/${path}`, getDatosCupon);



module.exports = router