const {Router} = require('express');
const router = Router();
const {GetPremios,AddPremio} = require('../controller/premio.controller')


//declarampos nuestra constante para almacenar el path`
const path = 'Premios';


//rutas del proyecto
router.get(`/${path}`, GetPremios);
//router.get(`/${path}/:id`,GetMunicipioById);
router.post(`/${path}`,AddPremio);
// router.put(`/${path}/:id`,UpdateMunicipio);
// router.delete(`/${path}/:id`,DeleteMunicipio);


module.exports = router