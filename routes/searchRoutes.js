// routes/searchRoutes.js
var express = require('express');
var router = express.Router();
var searchController = require('../controllers/searchController');
var authController = require('../controllers/authController');

// GET /explore — Explore/search page with filters (requires login)
router.get('/', authController.requireLogin, searchController.getExplorePage);

module.exports = router;
