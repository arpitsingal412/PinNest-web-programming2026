// controllers/roomController.js
// Handles Room Planner operations: list rooms, create room, detail, add/remove items
// All rooms belong to the logged-in user

var Room = require('../models/Room');
var Pin = require('../models/Pin');

// GET /rooms — Display only the logged-in user's rooms
var getRooms = function(req, res) {
  var userId = req.session.user._id;

  Room.find({ createdBy: userId }).lean()
    .then(function(rooms) {
      res.render('rooms', {
        title: 'My Rooms - PinNest',
        rooms: rooms,
        activePage: 'rooms'
      });
    })
    .catch(function(err) {
      console.log('Error fetching rooms:', err.message);
      res.render('rooms', {
        title: 'My Rooms - PinNest',
        rooms: [],
        activePage: 'rooms'
      });
    });
};

// GET /rooms/create — Show the Room Planner form with available pins
// Pins are the shared furniture catalogue, so all pins are shown
var getCreateRoom = function(req, res) {
  Pin.find({}).lean()
    .then(function(pins) {
      res.render('roomPlanner', {
        title: 'Room Planner - PinNest',
        pins: pins,
        activePage: 'rooms'
      });
    })
    .catch(function(err) {
      console.log('Error fetching pins for room planner:', err.message);
      res.render('roomPlanner', {
        title: 'Room Planner - PinNest',
        pins: [],
        activePage: 'rooms'
      });
    });
};

// POST /rooms/create — Create a new room with selected items
var postCreateRoom = function(req, res) {
  // Read the items from the hidden JSON field
  var itemsJson = req.body.items || '[]';
  var items = JSON.parse(itemsJson);

  // Calculate total using a loop
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  var newRoom = new Room({
    name: req.body.name,
    roomType: req.body.roomType,
    budget: Number(req.body.budget),
    items: items,
    total: total,
    createdBy: req.session.user._id
  });

  newRoom.save()
    .then(function(savedRoom) {
      res.redirect('/rooms/' + savedRoom._id);
    })
    .catch(function(err) {
      console.log('Error creating room:', err.message);
      res.redirect('/rooms/create');
    });
};

// GET /rooms/:id — Display a single room's detail page
var getRoomDetail = function(req, res) {
  var roomId = req.params.id;
  var userId = req.session.user._id;

  Room.findById(roomId).lean()
    .then(function(room) {
      if (!room) {
        return res.redirect('/rooms');
      }

      // Ownership check — a user can only open their own rooms
      if (!room.createdBy || room.createdBy.toString() !== userId) {
        return res.redirect('/rooms');
      }

      // Calculate remaining budget
      var remaining = room.budget - room.total;
      var isOverBudget = remaining < 0;

      res.render('roomDetail', {
        title: room.name + ' - PinNest',
        room: room,
        remaining: remaining,
        isOverBudget: isOverBudget,
        activePage: 'rooms'
      });
    })
    .catch(function(err) {
      console.log('Error fetching room:', err.message);
      res.redirect('/rooms');
    });
};

// POST /rooms/:id/add-item — Add a furniture item to a room
var postAddItem = function(req, res) {
  var roomId = req.params.id;
  var userId = req.session.user._id;

  Room.findById(roomId)
    .then(function(room) {
      if (!room) {
        return res.redirect('/rooms');
      }

      // Ownership check
      if (!room.createdBy || room.createdBy.toString() !== userId) {
        return res.redirect('/rooms');
      }

      // Create the item object
      var newItem = {
        pinId: req.body.pinId,
        title: req.body.title,
        price: Number(req.body.price),
        imageUrl: req.body.imageUrl || ''
      };

      // Add item to the room
      room.items.push(newItem);

      // Recalculate total using a loop
      var total = 0;
      for (var i = 0; i < room.items.length; i++) {
        total = total + room.items[i].price;
      }
      room.total = total;

      return room.save();
    })
    .then(function() {
      res.redirect('/rooms/' + roomId);
    })
    .catch(function(err) {
      console.log('Error adding item to room:', err.message);
      res.redirect('/rooms/' + roomId);
    });
};

// POST /rooms/:id/remove-item — Remove an item from a room
var postRemoveItem = function(req, res) {
  var roomId = req.params.id;
  var itemId = req.body.itemId;
  var userId = req.session.user._id;

  Room.findById(roomId)
    .then(function(room) {
      if (!room) {
        return res.redirect('/rooms');
      }

      // Ownership check
      if (!room.createdBy || room.createdBy.toString() !== userId) {
        return res.redirect('/rooms');
      }

      // Remove the item by filtering with a loop
      var updatedItems = [];
      for (var i = 0; i < room.items.length; i++) {
        if (room.items[i]._id.toString() !== itemId) {
          updatedItems.push(room.items[i]);
        }
      }
      room.items = updatedItems;

      // Recalculate total
      var total = 0;
      for (var j = 0; j < room.items.length; j++) {
        total = total + room.items[j].price;
      }
      room.total = total;

      return room.save();
    })
    .then(function() {
      res.redirect('/rooms/' + roomId);
    })
    .catch(function(err) {
      console.log('Error removing item from room:', err.message);
      res.redirect('/rooms/' + roomId);
    });
};

module.exports = {
  getRooms: getRooms,
  getCreateRoom: getCreateRoom,
  postCreateRoom: postCreateRoom,
  getRoomDetail: getRoomDetail,
  postAddItem: postAddItem,
  postRemoveItem: postRemoveItem
};