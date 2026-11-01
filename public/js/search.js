// search.js — Explore page JavaScript
// Demonstrates: DOM, event handling, callbacks, objects, 
// arrays, functions, parameters, conditionals, loops, 
// enumerating properties

// ============================================================
// JavaScript Objects — filter configuration object
// ============================================================
var filterConfig = {
  category: '',
  style: '',
  room: '',
  minPrice: '',
  maxPrice: ''
};

// ============================================================
// Function with parameters — reads form values into the filter object
// Demonstrates: DOM, object property access, functions
// ============================================================
function readFilterValues() {
  var doc = window.document;
  filterConfig.category = doc.getElementById('filter-category').value;
  filterConfig.style = doc.getElementById('filter-style').value;
  filterConfig.room = doc.getElementById('filter-room').value;
  filterConfig.minPrice = doc.getElementById('filter-min-price').value;
  filterConfig.maxPrice = doc.getElementById('filter-max-price').value;
}

// ============================================================
// Enumerating Properties — iterate over the filter object's keys
// Demonstrates: for...in loop, enumerating properties
// ============================================================
function countActiveFilters() {
  var count = 0;
  for (var key in filterConfig) {
    // Check if the property value is not empty
    if (filterConfig[key] !== '') {
      count = count + 1;
    }
  }
  return count;
}

// ============================================================
// Function with parameters and return value
// Demonstrates: functions, parameters, return types, conditionals
// ============================================================
function buildSearchSummary(query, filterCount) {
  var summary = '';
  
  if (query.length > 0) {
    summary = 'Searching for "' + query + '"';
  } else {
    summary = 'Showing all items';
  }

  if (filterCount > 0) {
    summary = summary + ' with ' + filterCount + ' filter';
    if (filterCount > 1) {
      summary = summary + 's';
    }
    summary = summary + ' applied';
  }

  return summary;
}

// ============================================================
// Event Handling with Callbacks
// Demonstrates: event handling, callbacks
// A named function passed as an argument to addEventListener is a callback
// ============================================================

// Callback function for search form submission
function handleSearchSubmit(event) {
  // Read the current filter values from the form
  readFilterValues();
  
  // Count how many filters are active
  var activeCount = countActiveFilters();
  
  // Build a search summary
  var searchInput = window.document.getElementById('search-input');
  var query = searchInput.value;
  var summary = buildSearchSummary(query, activeCount);
  
  // The form will submit normally via GET — no fetch() needed
  // This just demonstrates the JavaScript concepts before the form submits
}

// Attach event listener — the function handleSearchSubmit is the callback
var searchForm = window.document.getElementById('search-form');
if (searchForm) {
  searchForm.addEventListener('submit', handleSearchSubmit);
}

// ============================================================
// Additional event handling for filter changes
// ============================================================

// Callback function for filter dropdown changes
function handleFilterChange() {
  readFilterValues();
  var activeCount = countActiveFilters();
  
  // Simple console output to show filter state (for demonstration)
  // Using a loop to enumerate the filter properties
  for (var key in filterConfig) {
    if (filterConfig[key] !== '') {
      // This demonstrates enumerating properties in a real use case
    }
  }
}

// Attach to each filter dropdown
var filterSelects = window.document.getElementsByClassName('filter-select');
for (var i = 0; i < filterSelects.length; i++) {
  filterSelects[i].addEventListener('change', handleFilterChange);
}
