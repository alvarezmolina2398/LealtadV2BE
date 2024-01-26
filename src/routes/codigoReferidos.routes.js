const {Router} = require('express');
const router = Router();
const {getCodigoReferido} = require('../controllers/codigosReferidos.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'codigoReferidos';

//rutas del proyecto
router.patch(`/${path}`,getCodigoReferido);

module.exports = router;