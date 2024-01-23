const {Router} = require('express');
const router = Router();
const {GetRoles, AddRol, UpdateRol, DeleteRol, GetRolById} = require('../controller/rol.controller')
const {validateCreate} = require('../validator/rol')
const authUser = require('../Middleware/AuthMiddleware');


//declarampos nuestra constante para almacenar el path`
const path = 'Rol';


//rutas del proyecto
router.get(`/${path}`,authUser, GetRoles);
router.get(`/${path}/:id`,authUser,GetRolById);
router.post(`/${path}`,validateCreate,authUser,AddRol);
router.put(`/${path}/:id`,validateCreate,authUser,UpdateRol);
router.delete(`/${path}/:id`,authUser,DeleteRol);


module.exports = router