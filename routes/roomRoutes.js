// routes/roomRoutes.js
var express = require('express');
var router = express.Router();
var roomController = require('../controllers/roomController');
var authController = require('../controllers/authController');

// Every room route requires a logged-in user

// GET /rooms — List the user's rooms
router.get('/', authController.requireLogin, roomController.getRooms);

// GET /rooms/create — Show Room Planner form
router.get('/create', authController.requireLogin, roomController.getCreateRoom);

// POST /rooms/create — Create a new room
router.post('/create', authController.requireLogin, roomController.postCreateRoom);

// GET /rooms/:id — Room detail page
router.get('/:id', authController.requireLogin, roomController.getRoomDetail);

// POST /rooms/:id/add-item — Add an item to a room
router.post('/:id/add-item', authController.requireLogin, roomController.postAddItem);

// POST /rooms/:id/remove-item — Remove an item from a room
router.post('/:id/remove-item', authController.requireLogin, roomController.postRemoveItem);

module.exports = router;