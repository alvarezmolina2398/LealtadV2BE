const {Router} = require('express');
const router = Router();
const {AddCategoria,GetCategorias,GetCategoriaById,DeleteCategoria,UpdateCategoria} = require('../controller/categoria.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'Categoria';


//rutas del proyecto
router.get(`/${path}`,GetCategorias);
router.post(`/${path}`,AddCategoria);
router.put(`/${path}`,UpdateCategoria);
router.delete(`/${path}`,DeleteCategoria);
router.get(`/${path}`,GetCategoriaById);

module.exports = router;