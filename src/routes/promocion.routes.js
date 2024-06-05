const {Router} = require('express');
const router = Router();
const {GetPromocion,AddPromocion, GetPromocionById, UpdatePromocion, PausarPromocion, ActivarPromocion,TestearCodigo, DeletePromocion,checkNemonico} = require('../controllers/promocion.controller')
const authUser = require('../middlewares/auth.js');

//declarampos nuestra constante para almacenar el path`
const path = 'Promocion';


//rutas del proyecto
router.get(`/${path}`, authUser, GetPromocion);
router.get(`/${path}/:id`,authUser, GetPromocionById);
router.post(`/${path}`,authUser, AddPromocion);
router.put(`/${path}/editar/:id`,authUser, UpdatePromocion);
router.put(`/${path}/Pau/:id`,authUser, PausarPromocion);
router.post('/api/check-nemonico', checkNemonico);
router.put(`/${path}/Act/:id`,authUser, ActivarPromocion);
//router.post(`/${path}/Testear`,TestearCodigo);
 router.delete(`/${path}/:id`,authUser, DeletePromocion);
 
module.exports = router