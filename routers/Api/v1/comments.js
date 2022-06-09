const express = require('express');
const router = express.Router();
const comments_controller = require('../../../controllers/Api/v1/comments_api');

router.use('/',comments_controller.index);

module.exports = router;