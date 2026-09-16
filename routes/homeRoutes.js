// routes/homeRoutes.js
var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var authController = require('../controllers/authController');

// GET / — Home page (requires login)
router.get('/', authController.requireLogin, homeController.getHomePage);

module.exports = router;
