const { Router } = require('express');
const router = Router();

const {
    getUsuariosNotificacionesOfferCraftSel
} = require('../controllers/reporteOfercraft.controller.js');
const authUser = require('../middlewares/auth.js');


const path = 'reporteOfferCraft';

router.get(`/${path}/:idCampanas/:fecha1/:fecha2`, getUsuariosNotificacionesOfferCraftSel);


module.exports = router;