const {Router} = require('express');
const router = Router();
const {GetConfigReferidos, UpdateConfigReferidos, DeleteConfigReferidos} = require('../controller/configReferidos.controller');
const authUser = require('../Middleware/AuthMiddleware');

//declarampos nuestra constante para almacenar el path`
const path = 'ConfigReferidos';

//rutas del proyecto
router.get(`/${path}`,authUser, GetConfigReferidos);
router.put(`/${path}/:id`,authUser, UpdateConfigReferidos);
router.delete(`/${path}/:id`,authUser, DeleteConfigReferidos);

//exportacion de rutas
module.exports = router;