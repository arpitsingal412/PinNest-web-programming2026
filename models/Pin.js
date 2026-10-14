// models/Pin.js
// Mongoose model for furniture/interior pins

var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Pin', pinSchema);