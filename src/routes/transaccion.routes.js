const {Router} = require('express');
const router = Router();
const {GetTransaccions, AddTransaccion, UpdateTransaccion, DeleteTransaccion, GetTransaccionById} = require('../controller/transaccion.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Transaccion';


//rutas del proyecto
router.get(`/${path}`, GetTransaccions);
router.get(`/${path}/:id`,GetTransaccionById);
router.post(`/${path}`,AddTransaccion);
router.put(`/${path}/:id`,UpdateTransaccion);
router.delete(`/${path}/:id`,DeleteTransaccion);


module.exports = router