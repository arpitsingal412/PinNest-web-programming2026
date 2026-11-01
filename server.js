// server.js
// PinNest - Furniture & Interior Inspiration Website
// Node.js HTTP server using Express.js
// CSE2022 Web Programming

var express = require('express');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var session = require('express-session');
var path = require('path');

// Create Express application
var app = express();
var PORT = 3000;

// MongoDB connection (hardcoded — no dotenv)
var MONGODB_URI = 'mongodb://localhost:27017/pinnest';

// Connect to MongoDB using Mongoose
mongoose.connect(MONGODB_URI)
  .then(function() {
    console.log('Connected to MongoDB');
  })
  .catch(function(err) {
    console.log('MongoDB connection error:', err.message);
  });

// EJS template engine setup (replaces Handlebars)
// Plain .html files are rendered with EJS. express-ejs-layouts preserves the
// shared-layout concept (main + auth) that Handlebars provided via defaultLayout.
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Layout support — mirrors the old Handlebars defaultLayout: 'main'.
// A view can opt into a different layout by passing `layout: 'layouts/auth'`
// in its render options (see authController).
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Template helpers — previously registered as Handlebars helpers.
// Exposed as app.locals so every EJS view and partial can call them directly.
// formatPrice: format a price with the rupee symbol and Indian-style commas.
app.locals.formatPrice = function(price) {
  if (price === undefined || price === null) {
    return '₹0';
  }
  return '₹' + price.toLocaleString('en-IN');
};

// Express built-in middleware for parsing form data and JSON
// No need for body-parser package
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware — remembers who is logged in between requests
// The browser stores a session cookie, the server stores the session data
app.use(session({
  secret: 'pinnest-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Make the logged-in user available to EVERY view as `user`
// This is what lets the navbar show Login/Register or Logout
app.use(function(req, res, next) {
  res.locals.user = req.session.user || null;
  next();
});

// Serve static files from the public directory
// This supports the A3 requirement for static files
app.use(express.static(path.join(__dirname, 'public')));

// Import routes
var authRoutes = require('./routes/authRoutes');
var homeRoutes = require('./routes/homeRoutes');
var pinRoutes = require('./routes/pinRoutes');
var boardRoutes = require('./routes/boardRoutes');
var roomRoutes = require('./routes/roomRoutes');
var userRoutes = require('./routes/userRoutes');
var searchRoutes = require('./routes/searchRoutes');

// Use routes
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/pins', pinRoutes);
app.use('/boards', boardRoutes);
app.use('/rooms', roomRoutes);
app.use('/profile', userRoutes);
app.use('/explore', searchRoutes);

// Start the HTTP server
app.listen(PORT, function() {
  console.log('PinNest server running at http://localhost:' + PORT);
});