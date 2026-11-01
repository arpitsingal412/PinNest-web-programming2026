// routes/userRoutes.js
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authController = require('../controllers/authController');

// GET /profile — User profile page (login required)
router.get('/', authController.requireLogin, userController.getProfile);

// GET /profile/edit — Edit profile form (login required)
router.get('/edit', authController.requireLogin, userController.getEditProfile);

// POST /profile/edit — Save changes to name/email/bio (login required)
router.post('/edit', authController.requireLogin, userController.postEditProfile);

module.exports = router;