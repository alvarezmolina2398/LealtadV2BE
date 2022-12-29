const {Router} = require('express');
const router = Router();
const {GetTerceros, AddTercero, UpdateTercero, DeleteTercero, GetTerceroById} = require('../controller/tercero.controller')

const path = 'Tercero';

//rutas del proyecto
router.get(`/${path}`,GetTerceros);
router.post(`/${path}`,AddTercero);
router.put(`/${path}/:id`,UpdateTercero);
router.delete(`/${path}/:id`,DeleteTercero);
router.get(`/${path}/:id`,GetTerceroById);

module.exports = router;