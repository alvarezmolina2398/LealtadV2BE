const {Router} = require('express');
const router = Router();
const {GetUsuarios, AddUsuario, UpdateUsuario, DeleteUsuario, GetUsuarioById} = require('../controller/usuario.controller')
const {validateCreate} = require('../validator/usuario')


//declarampos nuestra constante para almacenar el path`
const path = 'Usuario';


//rutas del proyecto
router.get(`/${path}`, GetUsuarios);
router.get(`/${path}/:username`,GetUsuarioById);
router.post(`/${path}`,validateCreate,AddUsuario);
router.put(`/${path}/:username`,validateCreate,UpdateUsuario);
router.delete(`/${path}/:username`,DeleteUsuario);


module.exports = router