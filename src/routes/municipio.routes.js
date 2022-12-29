const {Router} = require('express');
const router = Router();
const {GetMunicipios, AddMunicipio, UpdateMunicipio, DeleteMunicipio, GetMunicipioById} = require('../controller/municipio.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Municipio';


//rutas del proyecto
router.get(`/${path}`, GetMunicipios);
router.get(`/${path}/:id`,GetMunicipioById);
router.post(`/${path}`,AddMunicipio);
router.put(`/${path}/:id`,UpdateMunicipio);
router.delete(`/${path}/:id`,DeleteMunicipio);


module.exports = router