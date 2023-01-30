const {Router} =require('express');
const router = Router();
const {addPermiso, getPermisos,getNoAsignados, getAsignados, deletePermisos} = require('../controller/permisoUsuario.controller')
const {} = require('../validator/permisoUsuario');

const path = 'permisosUsuario';

//rutas para metodos de departamento
router.get(`/${path}`, getPermisos);
router.patch(`/${path}/NoAsignados`, getNoAsignados);
router.patch(`/${path}/Asignados`, getAsignados);
router.post(`/${path}`,addPermiso);
//router.put(`/${path}/:id`,validateCreate,UpdateDepartamento);
router.delete(`/${path}`,deletePermisos);
//router.get(`/${path}/:id`,GetDepartamentobyId);

module.exports = router;