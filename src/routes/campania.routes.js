const { Router } = require('express');
const router = Router();
const { AddCampania, 
        GetcampanasActivas, 
        TestearTransaccion, 
        GetcampanasActivasById, 
        UpdateCampania, 
        PausarCampaña,
        ActivarCampaña,
        DeleteCampania } = require('../controller/campania.controller');
//const {validateCreate} = require('../validator/categoria')

//declarampos nuestra constante para almacenar el path`
const path = 'Campania';


//rutas del proyecto
router.get(`/${path}`, GetcampanasActivas);
router.get(`/${path}/TestearSimple`, TestearTransaccion);
router.post(`/${path}`, AddCampania);
router.put(`/${path}/:id`, UpdateCampania);
router.put(`/${path}/pausar/:id`, PausarCampaña);
router.put(`/${path}/activar/:id`, ActivarCampaña);
router.delete(`/${path}/:id`,DeleteCampania);
router.get(`/${path}/:id`,GetcampanasActivasById);

module.exports = router;