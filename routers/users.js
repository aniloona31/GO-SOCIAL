//this is the route for user_controller
const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users_controller');
const verification_controller = require('../controllers/verification_controller');

router.get('/profile/:id',passport.checkAuthentication,users_controller.profile);
router.get('/sign-in',users_controller.signIn);
router.get('/sign-up',users_controller.signUp);
router.get('/sign-out',users_controller.signOut);
router.post('/create',users_controller.create);
router.post('/profile-update/:id',passport.checkAuthentication,users_controller.modifyUser);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
),users_controller.createSession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), users_controller.createSession);
router.get('/reset-password',verification_controller.redirectToReset);
router.post('/send-reset-mail',verification_controller.resetPassword);
router.get('/reset/:token',verification_controller.verify);
router.post('/update-password',verification_controller.updatePassword);

module.exports = router;