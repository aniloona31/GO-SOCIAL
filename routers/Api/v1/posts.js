const express = require('express');
const router = express.Router();
const posts_controller = require('../../../controllers/Api/v1/posts_api');
const passport = require('passport');

router.get('/',posts_controller.index);
router.get('/all-posts',posts_controller.getAllPosts);
router.get('/delete-post/:id',passport.authenticate('jwt',{session : false}),posts_controller.deletePost);
module.exports = router;