const { Router } = require('express');
const router = Router();
const {addParticipacion} = require('../controller/participacion.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'Participacion';

//rutas dle proyecto
router.post(`/${path}`, addParticipacion);

module.exports = router;