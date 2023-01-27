const {Router} =require('express');
const router = Router();
const {addPermiso, getPermisos} = require('../controller/permisoUsuario.controller')
const {} = require('../validator/permisoUsuario');

const path = 'permisosUsuario';

//rutas para metodos de departamento
router.get(`/${path}`, getPermisos);
router.post(`/${path}`,addPermiso);
//router.put(`/${path}/:id`,validateCreate,UpdateDepartamento);
//router.delete(`/${path}/:id`,validateCreate,DeleteDepartamento);
//router.get(`/${path}/:id`,GetDepartamentobyId);

module.exports = router;