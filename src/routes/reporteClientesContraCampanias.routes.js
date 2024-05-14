const { Router } = require('express');
const router = Router();

const {
    
    fechaminimavalida,
    
    
} = require('../controllers/reporteCampaniasAcumuladas.js');
const authUser = require('../middlewares/auth.js');
 

const path = 'ConsultaReporteAcumulado';

router.get(`/${path}/:fechaFin`, fechaminimavalida);

module.exports = router;