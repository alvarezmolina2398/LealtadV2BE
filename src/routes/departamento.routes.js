const {Router} = require('express');
const router = Router();
const{GetDepartamentos, AddDepartamentos, UpdateDepartamento, DeleteDepartamento, GetDepartamentobyId} = require('../controller/departamento.controller');
const {validateCreate} = require('../validator/departamento')
const authUser = require('../Middleware/AuthMiddleware');

//almacenamos el path
const path = 'Departamento';

//rutas para metodos de departamento
router.get(`/${path}`,authUser, GetDepartamentos);
router.post(`/${path}`,authUser,AddDepartamentos);
router.put(`/${path}/:id`,validateCreate,authUser,UpdateDepartamento);
router.delete(`/${path}/:id`,authUser,DeleteDepartamento);
router.get(`/${path}/:id`,authUser,GetDepartamentobyId);

module.exports = router;