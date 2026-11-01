// models/Room.js
// Mongoose model for rooms (Room Planner feature)

var mongoose = require('mongoose');

// Sub-schema for items added to a room
var roomItemSchema = new mongoose.Schema({
  pinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pin'
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  }
});

var roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  items: {
    type: [roomItemSchema],
    default: []
  },
  total: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Room', roomSchema);
