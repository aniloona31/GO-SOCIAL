const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts_controller');
const passport  = require('passport');

router.get('/',posts_controller.posts);
router.post('/create-post',passport.checkAuthentication,posts_controller.createPost);
router.get('/delete/:id',passport.checkAuthentication,posts_controller.deletePost);
router.get('/like-post/:id',posts_controller.likePost);

module.exports = router;