// seed.js
// Seed script to populate MongoDB with sample furniture/interior data
// Run with: node seed.js
// This creates a default user

var mongoose = require('mongoose');
var User = require('./models/User');
var bcrypt = require('bcryptjs');

// MongoDB connection (same as server.js)
var MONGODB_URI = 'mongodb://localhost:27017/pinnest';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(function() {
    console.log('Connected to MongoDB for seeding');
    return seedDatabase();
  })
  .then(function() {
    console.log('Seeding complete!');
    console.log('Login with:  email: arpit@pinnest.com   password: pinnest123');
    mongoose.connection.close();
  })
  .catch(function(err) {
    console.log('Seeding error:', err.message);
    mongoose.connection.close();
  });

// Main seed function
function seedDatabase() {
  // Clear existing data first
  return User.deleteMany({})
    .then(function() {
      console.log('Cleared existing data');

      // ============================================================
      // CREATE DEFAULT USER
      // ============================================================
      var defaultUser = new User({
        name: 'Arpit Singal',
        email: 'arpit@pinnest.com',
        // Password is hashed before it is stored — never saved as plain text
        password: bcrypt.hashSync('pinnest123', 10),
        bio: 'Interior design enthusiast. Love modern and minimal furniture.',
        avatar: '/images/loginpic.jpg'
      });

      return defaultUser.save();
    })
    .then(function(user) {
      console.log('Created default user:', user.name);
    });
}