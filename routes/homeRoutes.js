// routes/homeRoutes.js
var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');

// GET / — Home page
router.get('/', homeController.getHomePage);

module.exports = router;
