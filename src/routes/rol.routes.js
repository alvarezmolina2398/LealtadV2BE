const {Router} = require('express');
const router = Router();
const {GetRoles, AddRol, UpdateRol, DeleteRol, GetRolById} = require('../controller/rol.controller')
const {validateCreate} = require('../validator/rol')


//declarampos nuestra constante para almacenar el path`
const path = 'Rol';


//rutas del proyecto
router.get(`/${path}`, GetRoles);
router.get(`/${path}/:id`,GetRolById);
router.post(`/${path}`,validateCreate,AddRol);
router.put(`/${path}/:id`,validateCreate,UpdateRol);
router.delete(`/${path}/:id`,DeleteRol);


module.exports = router