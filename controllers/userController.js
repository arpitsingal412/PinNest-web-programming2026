// controllers/userController.js
// Handles the profile page:
//   - viewing the profile (boards + rooms)
//   - editing display name and email
// The profile page no longer surfaces pins directly — pins live inside boards.

var User = require('../models/User');
var Board = require('../models/Board');
var Room = require('../models/Room');

// ============================================================
// GET /profile — Display the logged-in user's profile page
// ============================================================
var getProfile = function(req, res) {
  var userId = req.session.user._id;

  User.findById(userId).lean()
    .then(function(user) {
      // The account no longer exists — clear the session
      if (!user) {
        return req.session.destroy(function() {
          res.redirect('/login');
        });
      }

      // Fetch boards (with populated pins for the collage preview)
      // and rooms. We no longer fetch pins created by the user, since
      // profile no longer displays a "My Pins" section.
      return Board.find({ createdBy: userId })
        .populate('pins')
        .lean()
        .then(function(boards) {
          return Room.find({ createdBy: userId }).lean()
            .then(function(rooms) {
              res.render('profile', {
                title: user.name + ' - PinNest',
                user: user,
                boards: boards,
                rooms: rooms,
                boardCount: boards.length,
                roomCount: rooms.length,
                // Total pins saved across all boards — shown as a stat
                totalSavedPins: boards.reduce(function(sum, b) {
                  return sum + (b.pins ? b.pins.length : 0);
                }, 0),
                activePage: 'profile'
              });
            });
        });
    })
    .catch(function(err) {
      console.log('Error fetching profile:', err.message);
      res.redirect('/');
    });
};

// ============================================================
// GET /profile/edit — Show the edit form
// ============================================================
var getEditProfile = function(req, res) {
  var userId = req.session.user._id;

  User.findById(userId).lean()
    .then(function(user) {
      if (!user) {
        return req.session.destroy(function() {
          res.redirect('/login');
        });
      }

      res.render('editProfile', {
        title: 'Edit Profile - PinNest',
        user: user,
        error: '',
        name: user.name,
        email: user.email,
        bio: user.bio || '',
        activePage: 'profile'
      });
    })
    .catch(function(err) {
      console.log('Error loading edit profile:', err.message);
      res.redirect('/profile');
    });
};

// ============================================================
// POST /profile/edit — Update display name, email, and bio
// Rejects a change to an email another user already has.
// Refreshes the session so the navbar updates immediately.
// ============================================================
var postEditProfile = function(req, res) {
  var userId = req.session.user._id;
  var name = (req.body.name || '').trim();
  var email = (req.body.email || '').toLowerCase().trim();
  var bio = (req.body.bio || '').trim();

  // Re-renders the form with an error message
  function showError(message) {
    res.render('editProfile', {
      title: 'Edit Profile - PinNest',
      user: req.session.user,
      error: message,
      name: name,
      email: email,
      bio: bio,
      activePage: 'profile'
    });
  }

  // Basic validation
  if (name.length === 0) {
    return showError('Please enter a display name.');
  }

  if (email.length === 0) {
    return showError('Please enter an email address.');
  }

  // Check if the new email is already taken by SOMEONE ELSE
  // (the user is allowed to "change" their email to itself — this is a no-op)
  User.findOne({ email: email })
    .then(function(existingUser) {
      if (existingUser && existingUser._id.toString() !== userId) {
        return showError('That email is already used by another account.');
      }

      // No conflict — update the user record
      return User.findById(userId).then(function(user) {
        if (!user) {
          return req.session.destroy(function() {
            res.redirect('/login');
          });
        }

        user.name = name;
        user.email = email;
        user.bio = bio;

        return user.save().then(function(saved) {
          // Refresh the session so the navbar and greeting update immediately
          // (only the safe fields are stored — never the password)
          req.session.user = {
            _id: saved._id.toString(),
            name: saved.name,
            avatar: saved.avatar
          };
          res.redirect('/profile');
        });
      });
    })
    .catch(function(err) {
      console.log('Error updating profile:', err.message);
      showError('Something went wrong. Please try again.');
    });
};

module.exports = {
  getProfile: getProfile,
  getEditProfile: getEditProfile,
  postEditProfile: postEditProfile
};