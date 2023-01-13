const {Router} = require('express');
const router = Router();
const {GetTransaccions, AddTransaccion, UpdateTransaccion, DeleteTransaccion, GetTransaccionById} = require('../controller/transaccion.controller')
const {validateCreate} = require('../validator/transaccion')


//declarampos nuestra constante para almacenar el path`
const path = 'Transaccion';


//rutas del proyecto
router.get(`/${path}`, GetTransaccions);
router.get(`/${path}/:id`,GetTransaccionById);
router.post(`/${path}`,validateCreate,AddTransaccion);
router.put(`/${path}/:id`,validateCreate,UpdateTransaccion);
router.delete(`/${path}/:id`,DeleteTransaccion);


module.exports = router