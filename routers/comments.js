const express = require('express');
const router = express.Router();
const comments_controller = require('../controllers/comments_controller');
const passport  = require('passport');

console.log("at comment router");
router.post('/comment/',passport.checkAuthentication,comments_controller.addComment);
router.get('/delete-comment/:id',passport.checkAuthentication,comments_controller.deleteComment);
module.exports = router;