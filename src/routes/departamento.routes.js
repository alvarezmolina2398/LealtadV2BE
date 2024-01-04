const {Router} = require('express');
const router = Router();
const{GetDepartamentos, AddDepartamentos, UpdateDepartamento, DeleteDepartamento, GetDepartamentobyId} = require('../controller/departamento.controller');
const {validateCreate} = require('../validator/departamento')

//almacenamos el path
const path = 'Departamento';

//rutas para metodos de departamento
router.get(`/${path}`, GetDepartamentos);
router.post(`/${path}`,AddDepartamentos);
router.put(`/${path}/:id`,validateCreate,UpdateDepartamento);
router.delete(`/${path}/:id`,DeleteDepartamento);
router.get(`/${path}/:id`,GetDepartamentobyId);

module.exports = router;