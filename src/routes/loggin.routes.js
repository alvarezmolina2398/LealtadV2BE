const {Router} =require('express');
const router = Router();
const { loggin, getTokenStatus } = require('../controllers/loginController');

const path = 'loggin';

router.post(`/${path}`,loggin);
router.get(`/${path}/getToken`,getTokenStatus)

module.exports = router;