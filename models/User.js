// models/User.js
// Mongoose model for the application user/profile
// Now also stores login credentials (email + hashed password)

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: '/images/loginpic.jpg'
  }
});

module.exports = mongoose.model('User', userSchema);