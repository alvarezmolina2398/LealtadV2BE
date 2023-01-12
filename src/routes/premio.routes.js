const {Router} = require('express');
const router = Router();
const {GetPremios, AddPremio, UpdatePremio, DeletePremio, GetPremioById} = require('../controller/premio.controller')
const {validateCreate} = require('../validator/premio')


//declarampos nuestra constante para almacenar el path`
const path = 'Premio';

//rutas del proyecto
router.get(`/${path}`, GetPremios);
router.get(`/${path}/:id`,GetPremioById);
router.post(`/${path}`,validateCreate,AddPremio);
router.put(`/${path}/:id`,validateCreate,UpdatePremio);
router.delete(`/${path}/:id`,DeletePremio);


module.exports = router