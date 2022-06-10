const express = require('express');
const router = express.Router();
const users_controller = require('../../../controllers/Api/v1/users_api');

router.get('/',users_controller.index);
router.post('/create-session',users_controller.createSession);

module.exports = router;