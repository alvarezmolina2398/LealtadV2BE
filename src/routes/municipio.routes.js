const {Router} = require('express');
const router = Router();
const {GetMunicipios, AddMunicipio, UpdateMunicipio, DeleteMunicipio, GetMunicipioById} = require('../controller/municipio.controller')
const {validateCreate} = require('../validator/municipio')


//declarampos nuestra constante para almacenar el path`
const path = 'Municipio';


//rutas del proyecto
router.get(`/${path}`, GetMunicipios);
router.get(`/${path}/:id`,GetMunicipioById);
router.post(`/${path}`,validateCreate,AddMunicipio);
router.put(`/${path}/:id`,validateCreate,UpdateMunicipio);
router.delete(`/${path}/:id`,DeleteMunicipio);


module.exports = router