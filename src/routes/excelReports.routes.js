const { Router } = require('express');
const router = Router();
const { clientesParticipando } = require('../controllers/excelReports.controller.js');
const authUser = require('../middlewares/auth.js');

const path = 'reports/excel';

router.get(`/${path}`,authUser, clientesParticipando);
/* router.get(`/${path}/TestearSimple`,authUser, TestearTransaccion);
router.post(`/${path}`,authUser, AddCampania);
router.put(`/${path}/:id`,authUser, UpdateCampania);
router.put(`/${path}/pausar/:id`,authUser, PausarCampaña);
router.put(`/${path}/activar/:id`,authUser, ActivarCampaña);
router.delete(`/${path}/:id`,authUser,DeleteCampania);
router.get(`/${path}/:id`,authUser,GetcampanasActivasById); */

module.exports = router;