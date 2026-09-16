// routes/authRoutes.js
var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');

// GET /login — show login form
router.get('/login', authController.getLogin);

// POST /login — submit login form
router.post('/login', authController.postLogin);

// GET /register — show registration form
router.get('/register', authController.getRegister);

// POST /register — submit registration form
router.post('/register', authController.postRegister);

// GET /logout — log the user out
router.get('/logout', authController.getLogout);

module.exports = router;