const { Router } = require('express');
const router = Router();

const {
  GetEnvios,
  AddEnvio,
  UpdateEnvio,
  DeleteEnvio,
  GetEnvioById,
} = require('../controllers/enviaPremioController.js');
const authUser = require('../middlewares/auth.js'); 


const path = 'enviaPremio';


router.get(`/${path}`, authUser, GetEnvios); 
router.post(`/${path}`, AddEnvio);
router.put(`/${path}/:id`, UpdateEnvio); 
router.delete(`/${path}/:id`, DeleteEnvio); 
router.get(`/${path}/:id`, GetEnvioById); 


module.exports = router;