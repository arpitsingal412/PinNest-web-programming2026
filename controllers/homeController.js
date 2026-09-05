// controllers/homeController.js
// Handles the home page

// GET / — Display home page
var getHomePage = function(req, res) {
  res.render('home', {
    title: 'PinNest - Furniture & Interior Inspiration',
    activePage: 'home'
  });
};

module.exports = {
  getHomePage: getHomePage
};