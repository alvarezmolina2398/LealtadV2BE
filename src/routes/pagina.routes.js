const {Router} = require('express');
const router = Router();

const {AddPagina,GetPaginas,GetPaginaById,DeletePagina,UpdatePagina} = require('../controller/pagina.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'Pagina';

//rutas del proyecto
// router.get(`/${path}`,GetPaginas);
// router.post(`/${path}`,AddPagina);
// router.put(`/${path}/:id`,UpdatePagina);
// router.delete(`/${path}/:id`,DeletePagina);
// router.get(`/${path}/:id`,GetMenuById);

//exportacion de rutas
module.exports = router;