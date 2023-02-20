const {Router} =require('express');
const router = Router();
const { loggin } = require('../controller/loginController');

const path = 'loggin';

router.post(`/${path}`,loggin);

module.exports = router;