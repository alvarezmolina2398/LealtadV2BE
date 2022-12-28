const {Router} = require('express');
const router = Router();
const {GetPromocion,AddPromocion} = require('../controller/promocion.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Promocion';


//rutas del proyecto
router.get(`/${path}`, GetPromocion);
// router.get(`/${path}/:id`,GetTransaccionById);
router.post(`/${path}`,AddPromocion);
// router.put(`/${path}/:id`,UpdateTransaccion);
// router.delete(`/${path}/:id`,DeleteTransaccion);


module.exports = router