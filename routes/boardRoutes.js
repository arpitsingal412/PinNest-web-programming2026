// routes/boardRoutes.js
var express = require('express');
var router = express.Router();
var boardController = require('../controllers/boardController');
var authController = require('../controllers/authController');

// Every board route requires a logged-in user
// requireLogin runs BEFORE the controller function

// GET /boards — List the user's boards
router.get('/', authController.requireLogin, boardController.getBoards);

// POST /boards/create — Create a new board
router.post('/create', authController.requireLogin, boardController.postCreateBoard);


// GET /boards/:id — Board detail page
router.get('/:id', authController.requireLogin, boardController.getBoardDetail);

// POST /boards/:id/add-pin — Add a pin to a board (form-based, redirects)
router.post('/:id/add-pin', authController.requireLogin, boardController.postAddPinToBoard);

// POST /boards/:id/remove-pin — Remove a pin from a board
router.post('/:id/remove-pin', authController.requireLogin, boardController.postRemovePinFromBoard);

// POST /boards/:id/delete — Delete an entire board
router.post('/:id/delete', authController.requireLogin, boardController.postDeleteBoard);

module.exports = router;