const {Router} = require('express');
const router = Router();
const {AddCategoria,GetCategorias,GetCategoriaById,DeleteCategoria,UpdateCategoria} = require('../controller/categoria.controller');
const {validateCreate} = require('../validator/categoria')
const authUser = require('../Middleware/AuthMiddleware');

//declarampos nuestra constante para almacenar el path`
const path = 'Categoria';


//rutas del proyecto
router.get(`/${path}`,authUser,GetCategorias);
router.post(`/${path}`,AddCategoria);
router.put(`/${path}/:id`,validateCreate,UpdateCategoria);
router.delete(`/${path}/:id`,DeleteCategoria);
router.get(`/${path}/:id`,GetCategoriaById);

module.exports = router;