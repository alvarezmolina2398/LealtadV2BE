const {Router} = require('express');
const {getParticipacionesFechasGeneral} = require('../controllers/reporteGeneral.controller');
const router = Router();

const path = 'reporteGeneralReferido';

// router.post(`/${path}`, postParticipacionesFechasGeneral);
router.get(`/${path}`, getParticipacionesFechasGeneral);
//router.get(`/${path}/getParticipacionesFechasFeneral`, getParticipacionesFechasGeneral);

module.exports = router

// const express = require('express');
// const router = express.Router();

// const {
//     getParticipacionesFechasGeneral,
//     getParticipacionesFechasGeneral,
// } = require('../controllers/reporteGeneral.controller');

// const path = 'reporteGeneralReferido';

// router.get(`/${path}`, getParticipacionesFechasGeneral);
// router.get(`/${path}`, getParticipacionesFechasGeneral);

// module.exports = router;