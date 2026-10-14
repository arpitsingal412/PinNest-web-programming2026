// controllers/pinController.js
// Handles pin-related operations — viewing a pin's detail page
// Pins are a shared furniture catalogue, loaded from seed.js — there is no create-pin flow

var Pin = require('../models/Pin');
var Board = require('../models/Board');

// GET /pins/:id — Show a single pin's detail page
// This page is public, but the "Save to Board" dropdown
// only lists boards belonging to the logged-in user
var getPinDetail = function(req, res) {
  var pinId = req.params.id;

  Pin.findById(pinId).lean()
    .then(function(pin) {
      if (!pin) {
        return res.redirect('/');
      }

      // Logged out visitors get an empty board list
      if (!req.session.user) {
        return res.render('pinDetail', {
          title: pin.title + ' - PinNest',
          pin: pin,
          boards: [],
          activePage: ''
        });
      }

      return Board.find({ createdBy: req.session.user._id }).lean()
        .then(function(boards) {
          res.render('pinDetail', {
            title: pin.title + ' - PinNest',
            pin: pin,
            boards: boards,
            activePage: ''
          });
        });
    })
    .catch(function(err) {
      console.log('Error fetching pin:', err.message);
      res.redirect('/');
    });
};

module.exports = {
  getPinDetail: getPinDetail
};