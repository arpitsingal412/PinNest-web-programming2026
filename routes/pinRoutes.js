// routes/pinRoutes.js
var express = require('express');
var router = express.Router();
var pinController = require('../controllers/pinController');

// GET /pins/:id — Pin detail page (public — pins are a shared catalogue)
router.get('/:id', pinController.getPinDetail);

module.exports = router;