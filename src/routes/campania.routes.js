const { Router } = require('express');
const router = Router();
const { AddCampania, 
        GetcampanasActivas, 
        TestearTransaccion, 
        GetcampanasActivasById, 
        UpdateCampania, 
        PausarCampaña,
        ActivarCampaña,
        DeleteCampania
        } = require('../controllers/campania.controller');
//const {validateCreate} = require('../validators/categoria')
const authUser = require('../middlewares/auth.js');

//declarampos nuestra constante para almacenar el path`
const path = 'Campania';


//rutas del proyecto
router.get(`/${path}`,authUser, GetcampanasActivas);
router.get(`/${path}/TestearSimple`,authUser, TestearTransaccion);
router.post(`/${path}`,authUser, AddCampania);
router.put(`/${path}/:id`,authUser, UpdateCampania);
router.put(`/${path}/pausar/:id`,authUser, PausarCampaña);
router.put(`/${path}/activar/:id`,authUser, ActivarCampaña);
router.delete(`/${path}/:id`,authUser,DeleteCampania);
router.get(`/${path}/:id`,authUser,GetcampanasActivasById);




module.exports = router;