// controllers/searchController.js
// Handles the Explore/Search page — search and filter pins

var Pin = require('../models/Pin');

// GET /explore — Display search page with optional filters
var getExplorePage = function(req, res) {
  // Read query parameters from the search form
  var searchQuery = req.query.q || '';
  var categoryFilter = req.query.category || '';
  var styleFilter = req.query.style || '';
  var roomFilter = req.query.room || '';
  var minPrice = req.query.minPrice || '';
  var maxPrice = req.query.maxPrice || '';

  // Build a Mongoose query object
  var query = {};

  // Text search: search in title, description, and tags
  if (searchQuery.length > 0) {
    var searchRegex = new RegExp(searchQuery, 'i');
    query['$or'] = [
      { title: searchRegex },
      { description: searchRegex },
      { tags: searchRegex }
    ];
  }

  // Category filter
  if (categoryFilter.length > 0) {
    query.category = categoryFilter;
  }

  // Style filter
  if (styleFilter.length > 0) {
    query.style = styleFilter;
  }

  // Room filter
  if (roomFilter.length > 0) {
    query.room = roomFilter;
  }

  // Price range filter
  if (minPrice.length > 0 || maxPrice.length > 0) {
    query.price = {};
    if (minPrice.length > 0) {
      query.price['$gte'] = Number(minPrice);
    }
    if (maxPrice.length > 0) {
      query.price['$lte'] = Number(maxPrice);
    }
  }

  // Determine whether any filter is active — if not, we render the
  // default "browse by room" view instead of a results grid
  var hasFilters = searchQuery.length > 0 || categoryFilter.length > 0
                || styleFilter.length > 0  || roomFilter.length > 0
                || minPrice.length > 0     || maxPrice.length > 0;

  // Retrieve filtered pins from MongoDB
  Pin.find(query).lean()
    .then(function(pins) {
      res.render('explore', {
        title: 'Explore - PinNest',
        pins: pins,
        searchQuery: searchQuery,
        categoryFilter: categoryFilter,
        styleFilter: styleFilter,
        roomFilter: roomFilter,
        minPrice: minPrice,
        maxPrice: maxPrice,
        resultCount: pins.length,
        hasFilters: hasFilters,
        activePage: 'explore'
      });
    })
    .catch(function(err) {
      console.log('Error searching pins:', err.message);
      res.render('explore', {
        title: 'Explore - PinNest',
        pins: [],
        searchQuery: searchQuery,
        resultCount: 0,
        hasFilters: hasFilters,
        activePage: 'explore'
      });
    });
};

module.exports = {
  getExplorePage: getExplorePage
};