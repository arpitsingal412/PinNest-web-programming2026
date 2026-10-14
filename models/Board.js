// models/Board.js
// Mongoose model for boards (collections of saved pins)

var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  pins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pin'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Board', boardSchema);
