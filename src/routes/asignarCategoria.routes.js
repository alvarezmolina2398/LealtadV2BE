const {Router} =require('express');
const router = Router();
const {
    addCategoria,
    getNoAsignados,
    getAsignados,
    deleteTransacciones
} = require('../controller/asignarCategoria.controller');

const path = 'asignarCategoria';

//rutas para metodos de asignacion de transacciones a una categoria
//router.get(`/${path}`, getPermisos);
router.patch(`/${path}/NoAsignados`, getNoAsignados);
router.patch(`/${path}/Asignados`, getAsignados);
router.post(`/${path}`,addCategoria);
router.delete(`/${path}`,deleteTransacciones);

module.exports = router;