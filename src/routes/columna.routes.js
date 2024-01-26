const {Router} = require('express');
const router = Router();
const {AddColumna,UpdateColumna,DeleteColumna,GetColumnaById,GetColumnas} = require('../controllers/columna.controller');
const {validateCreate} = require('../validator/columna')
const authUser = require('../middlewares/AuthMiddleware');

//declarampos nuestra constante para almacenar el path`
const path = 'Columna';


//rutas del proyecto
router.get(`/${path}`,authUser,GetColumnas);
router.post(`/${path}`,authUser,AddColumna);
router.put(`/${path}/:id`,validateCreate,authUser,UpdateColumna);
router.delete(`/${path}/:id`,authUser,DeleteColumna);
router.get(`/${path}/:id`,authUser,GetColumnaById);

module.exports = router;