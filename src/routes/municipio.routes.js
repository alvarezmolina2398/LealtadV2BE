const {Router} = require('express');
const router = Router();
const {GetMunicipios, AddMunicipio, UpdateMunicipio, DeleteMunicipio, GetMunicipioById} = require('../controller/municipio.controller')
const {validateCreate} = require('../validator/municipio')
const authUser = require('../Middleware/AuthMiddleware');


//declarampos nuestra constante para almacenar el path`
const path = 'Municipio';


//rutas del proyecto
router.get(`/${path}`,authUser, GetMunicipios);
router.get(`/${path}/:id`,authUser,GetMunicipioById);
router.post(`/${path}`,validateCreate,authUser,AddMunicipio);
router.put(`/${path}/:id`,validateCreate,authUser,UpdateMunicipio);
router.delete(`/${path}/:id`,authUser,DeleteMunicipio);


module.exports = router