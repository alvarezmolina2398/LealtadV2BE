const {Router} = require('express');
const router = Router();
const {GetPromocion,AddPromocion,ActivarPromocion,PausarPromocion} = require('../controller/promocion.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Promocion';


//rutas del proyecto
router.get(`/${path}`, GetPromocion);
router.put(`/${path}/Act/:id`,ActivarPromocion);
router.put(`/${path}/Pau/:id`,PausarPromocion);
router.post(`/${path}`,AddPromocion);
// router.put(`/${path}/:id`,UpdateTransaccion);
// router.delete(`/${path}/:id`,DeleteTransaccion);


module.exports = router