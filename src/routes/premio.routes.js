const {Router} = require('express');
const router = Router();
const {GetPremios, AddPremio, UpdatePremio, DeletePremio, GetPremioById} = require('../controller/premio.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Premio';

//rutas del proyecto
router.get(`/${path}`, GetPremios);
router.get(`/${path}/:id`,GetPremioById);
router.post(`/${path}`,AddPremio);
router.put(`/${path}/:id`,UpdatePremio);
router.delete(`/${path}/:id`,DeletePremio);


module.exports = router