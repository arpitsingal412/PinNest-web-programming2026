// controllers/homeController.js
// Handles the home page — displays pins in a Pinterest-style masonry feed

var Pin = require('../models/Pin');

// GET / — Display home page with all pins
var getHomePage = function(req, res) {
  Pin.find({}).lean()
    .then(function(pins) {
      res.render('home', {
        title: 'PinNest - Furniture & Interior Inspiration',
        pins: pins,
        activePage: 'home'
      });
    })
    .catch(function(err) {
      console.log('Error fetching pins:', err.message);
      res.render('home', {
        title: 'PinNest - Furniture & Interior Inspiration',
        pins: [],
        activePage: 'home'
      });
    });
};

module.exports = {
  getHomePage: getHomePage
};