// controllers/authController.js
// Handles login, registration and logout
// Passwords are hashed with bcryptjs before being stored in MongoDB

var User = require('../models/User');
var bcrypt = require('bcryptjs');

// Helper — saves the logged-in user into the session
// Only the safe fields are stored (never the password)
function startSession(req, user) {
  req.session.user = {
    _id: user._id.toString(),
    name: user.name,
    avatar: user.avatar
  };
}

// ============================================================
// MIDDLEWARE — protects routes that need a logged-in user
// Used inside the route files before the controller function
// ============================================================
var requireLogin = function(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
};

// GET /login — show the login form
// layout: 'auth' — the plain gate layout with no navbar (see views/layouts/auth.hbs)
var getLogin = function(req, res) {
  // Already logged in? Go straight to the home page
  if (req.session.user) {
    return res.redirect('/');
  }

  res.render('login', {
    title: 'Login - PinNest',
    activePage: 'login',
    error: '',
    email: '',
    layout: 'auth'
  });
};

// POST /login — check the credentials and start a session
var postLogin = function(req, res) {
  var email = (req.body.email || '').toLowerCase().trim();
  var password = req.body.password || '';

  // Basic validation
  if (email.length === 0 || password.length === 0) {
    return res.render('login', {
      title: 'Login - PinNest',
      activePage: 'login',
      error: 'Please enter both email and password.',
      email: email,
      layout: 'auth'
    });
  }

  User.findOne({ email: email })
    .then(function(user) {
      // No account with this email
      if (!user) {
        return res.render('login', {
          title: 'Login - PinNest',
          activePage: 'login',
          error: 'No account found with that email.',
          email: email,
          layout: 'auth'
        });
      }

      // Compare the typed password with the stored hash
      var passwordMatches = bcrypt.compareSync(password, user.password);

      if (passwordMatches === false) {
        return res.render('login', {
          title: 'Login - PinNest',
          activePage: 'login',
          error: 'Incorrect password.',
          email: email,
          layout: 'auth'
        });
      }

      // Success — store the user in the session and go home
      startSession(req, user);
      res.redirect('/');
    })
    .catch(function(err) {
      console.log('Error logging in:', err.message);
      res.render('login', {
        title: 'Login - PinNest',
        activePage: 'login',
        error: 'Something went wrong. Please try again.',
        email: email,
        layout: 'auth'
      });
    });
};

// GET /register — show the registration form
var getRegister = function(req, res) {
  if (req.session.user) {
    return res.redirect('/');
  }

  res.render('register', {
    title: 'Register - PinNest',
    activePage: 'register',
    error: '',
    name: '',
    email: '',
    layout: 'auth'
  });
};

// POST /register — create a new user account
var postRegister = function(req, res) {
  var name = (req.body.name || '').trim();
  var email = (req.body.email || '').toLowerCase().trim();
  var password = req.body.password || '';
  var confirmPassword = req.body.confirmPassword || '';

  // Re-renders the form with an error message
  function showError(message) {
    res.render('register', {
      title: 'Register - PinNest',
      activePage: 'register',
      error: message,
      name: name,
      email: email,
      layout: 'auth'
    });
  }

  // Validation using conditional statements
  if (name.length === 0 || email.length === 0 || password.length === 0) {
    return showError('Please fill in all the required fields.');
  }

  if (password.length < 6) {
    return showError('Password must be at least 6 characters long.');
  }

  if (password !== confirmPassword) {
    return showError('The two passwords do not match.');
  }

  // Make sure the email is not already taken
  User.findOne({ email: email })
    .then(function(existingUser) {
      if (existingUser) {
        return showError('An account with that email already exists.');
      }

      // Hash the password before saving it
      var hashedPassword = bcrypt.hashSync(password, 10);

      var newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        bio: (req.body.bio || '').trim()
      });

      return newUser.save().then(function(savedUser) {
        // Log the new user in straight away
        startSession(req, savedUser);
        res.redirect('/');
      });
    })
    .catch(function(err) {
      console.log('Error registering user:', err.message);
      showError('Something went wrong. Please try again.');
    });
};

// GET /logout — destroy the session
var getLogout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

module.exports = {
  requireLogin: requireLogin,
  getLogin: getLogin,
  postLogin: postLogin,
  getRegister: getRegister,
  postRegister: postRegister,
  getLogout: getLogout
};