const {Router} = require('express');
const router = Router();
const {addPremiacion} =  require('../controller/premiacion.controller');

const path = 'Premiacion';

router.post(`/${path}`,addPremiacion);

module.exports = router;

