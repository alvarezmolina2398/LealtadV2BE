const { Router } = require('express');
const router = Router();

const {
    getParticipacionesActivas
} = require('../controllers/participacionesActivas.controller.js');
const authUser = require('../middlewares/auth.js');


const path = 'ParticipacionesActivas';

router.post(`/${path}`, getParticipacionesActivas);


module.exports = router;