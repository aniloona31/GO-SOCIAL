const express = require('express');
const router = express.Router();
const posts_controller = require('../../../controllers/Api/v1/posts_api');


router.get('/',posts_controller.index);
router.get('/all-posts',posts_controller.getAllPosts);
router.get('/delete-post/:id',posts_controller.deletePost);
module.exports = router;