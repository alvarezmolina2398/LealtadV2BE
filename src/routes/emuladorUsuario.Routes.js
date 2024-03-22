const { Router } = require('express');
const router = Router();

const {
  // GetEnviaPremio,
  // AddEnvio,
  // UpdateEnvio,
  // DeleteEnvio,
  GetNumeroById,
} = require('../controllers/emuladorUsuarioController.js');
const authUser = require('../middlewares/auth.js'); 


const path = 'ConsultaNumber';


// router.get(`/${path}`, authUser, GetEnviaPremio); 
// router.post(`/${path}`, AddEnvio);
// router.put(`/${path}/:id`, UpdateEnvio); 
// router.delete(`/${path}/:id`, DeleteEnvio); 
router.get(`/${path}/:telefono`, GetNumeroById); 
// router.get(`/${path}/:telno`, GetNumeroById); 


module.exports = router;
