const {Router} = require('express');
const router = Router();
const {GetTerceros, AddTercero, UpdateTercero, DeleteTercero, GetTerceroById} = require('../controller/tercero.controller')
const {validateCreate} = require('../validator/terceros')

const path = 'Tercero';

//rutas del proyecto
router.get(`/${path}`,GetTerceros);
router.post(`/${path}`,AddTercero);
router.put(`/${path}/:id`,validateCreate,UpdateTercero);
router.delete(`/${path}/:id`,validateCreate,DeleteTercero);
router.get(`/${path}/:id`,GetTerceroById);

module.exports = router;