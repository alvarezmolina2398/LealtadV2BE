const { Router } = require('express');
const router = Router();
// const {GetReferidos} = require('../controller/referidosIngresos.controller');
const { GetReferidos } = require('../controllers/ReferidosIngresos.controller');


const path = 'referidosIngresos';

router.get(`/${path}`,GetReferidos);

module.exports = router;