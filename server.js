// server.js
// PinNest - Furniture & Interior Inspiration Website
// Node.js HTTP server using Express.js
// CSE2022 Web Programming

var express = require('express');
var exphbs = require('express-handlebars');
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

// Handlebars template engine setup
var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    // Helper to check equality (used in Handlebars conditionals)
    eq: function(a, b) {
      return a === b;
    },
    }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

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

// Make the logged-in user available to EVERY Handlebars view as {{user}}
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

// Use routes
app.use('/', authRoutes);
app.use('/', homeRoutes);

// Start the HTTP server
app.listen(PORT, function() {
  console.log('PinNest server running at http://localhost:' + PORT);
});