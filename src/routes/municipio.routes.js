const {Router} = require('express');
const router = Router();
const {GetMunicipios, AddMunicipio, UpdateMunicipio, DeleteMunicipio, GetMunicipioById} = require('../controller/municipio.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Municipio';


//rutas del proyecto
router.get(`/${path}`, GetMunicipios);
router.get(`/${path}/:id`,AddMunicipio);
router.post(`/${path}`,UpdateMunicipio);
router.put(`/${path}/:id`,DeleteMunicipio);
router.delete(`/${path}/:id`,GetMunicipioById);


module.exports = router