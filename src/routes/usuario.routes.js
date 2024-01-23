const {Router} = require('express');
const router = Router();
const {GetUsuarios, AddUsuario, UpdateUsuario, DeleteUsuario, GetUsuarioById} = require('../controller/usuario.controller')
const {validateCreate} = require('../validator/usuario')
const env = require('../Bin/Env');
const authUser = require('../Middleware/AuthMiddleware');


//declarampos nuestra constante para almacenar el path`
const path = 'Usuario';


//rutas del proyecto
router.get(`/${path}`, authUser, GetUsuarios);
router.get(`/${path}/:username`,authUser,GetUsuarioById);
router.post(`/${path}`,validateCreate,authUser,AddUsuario);
router.put(`/${path}/:username`,validateCreate,authUser,UpdateUsuario);
router.delete(`/${path}/:username`,authUser,DeleteUsuario);


module.exports = router