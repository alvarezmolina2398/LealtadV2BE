const {Router} = require('express');
const router = Router();
const {GetTransaccions, AddTransaccion, UpdateTransaccion, DeleteTransaccion, GetTransaccionById} = require('../controllers/transaccion.controller')
const {validateCreate} = require('../validators/transaccion')
const authUser = require('../middlewares/authMiddleware');


//declarampos nuestra constante para almacenar el path`
const path = 'Transaccion';


//rutas del proyecto
router.get(`/${path}`,authUser, GetTransaccions);
router.get(`/${path}/:id`,authUser, GetTransaccionById);
router.post(`/${path}`,validateCreate,authUser, AddTransaccion);
router.put(`/${path}/:id`,validateCreate,authUser, UpdateTransaccion);
router.delete(`/${path}/:id`,authUser, DeleteTransaccion);


module.exports = router