const {Router} = require('express');
const router = Router();

const {GetConfigReferidos, UpdateConfigReferidos, DeleteConfigReferidos} = require('../controller/configReferidos.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'ConfigReferidos';

//rutas del proyecto
router.get(`/${path}`,GetConfigReferidos);
router.put(`/${path}/:id`,UpdateConfigReferidos);
router.delete(`/${path}/:id`,DeleteConfigReferidos);

//exportacion de rutas
module.exports = router;