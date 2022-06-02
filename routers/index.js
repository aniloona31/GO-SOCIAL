const express = require('express');

//to create a route handler, abb index.js se jo bhi requests aayegi vo yha aayegi...
const router = express.Router();
const home_controller = require('../controllers/home_controller');
const about_controller = require('../controllers/about_controller');

console.log('router loaded')

//this is like the api end point (mapping in spring) and the the method we write coresponding to that url is written in controller layer
router.get('/',home_controller.home)
router.use('/users',require('./users'))
router.use('/posts',require('./posts'));

router.get('/about',about_controller.about)

module.exports = router;