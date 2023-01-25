const {Router} = require('express');
const router = Router();

const {AddMenu,GetMenus,GetMenuById,DeleteMenu,UpdateMenu} = require('../controller/menu.controller');

//declarampos nuestra constante para almacenar el path`
const path = 'Menu';

//rutas del proyecto
router.get(`/${path}`,GetMenus);
router.post(`/${path}`,AddMenu);
router.put(`/${path}/:id`,UpdateMenu);
router.delete(`/${path}/:id`,DeleteMenu);
router.get(`/${path}/:id`,GetMenuById);

//exportacion de rutas
module.exports = router;