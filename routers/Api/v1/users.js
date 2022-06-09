const express = require('express');
const router = express.Router();
const users_controller = require('../../../controllers/Api/v1/users_api');

router.use('/',users_controller.index);

module.exports = router;