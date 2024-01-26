const {Router} =require('express');
const router = Router();
const {
    addCategoria,
    getNoAsignados,
    getAsignados,
    deleteTransacciones
} = require('../controllers/asignarCategoria.controller');
const authUser = require('../middlewares/authMiddleware');

const path = 'asignarCategoria';

//rutas para metodos de asignacion de transacciones a una categoria
//router.get(`/${path}`, getPermisos);
router.patch(`/${path}/NoAsignados`,authUser,  getNoAsignados);
router.patch(`/${path}/Asignados`,authUser,  getAsignados);
router.post(`/${path}`,authUser, addCategoria);
router.delete(`/${path}`,authUser, deleteTransacciones);

module.exports = router;