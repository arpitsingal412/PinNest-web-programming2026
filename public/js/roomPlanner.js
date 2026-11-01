// roomPlanner.js — Room Planner JavaScript
// This is the project's unique feature
// Demonstrates ALL JavaScript topics from the course handout:
//   data types, primitive types, statements, keywords, operators,
//   conditional statements, function parameters, function return types,
//   arrays, objects, Window Objects, DOM, object creation,
//   adding methods to objects, loops and iteration,
//   adding properties to objects, event handling,
//   enumerating properties, callbacks, JSON

// ============================================================
// ARRAYS — selectedItems stores furniture items added to the room
// ============================================================
var selectedItems = [];

// ============================================================
// PRIMITIVE TYPES — budget is a number, room name is a string
// ============================================================
var budget = 0;

// ============================================================
// OBJECT CREATION — the roomPlanner object manages the room
// Demonstrates: object creation, adding methods to objects
// ============================================================
var roomPlanner = {
  name: '',
  roomType: '',
  budget: 0,
  total: 0
};

// ============================================================
// ADDING METHODS TO OBJECTS
// Demonstrates: adding methods, function parameters, arrays, objects
// ============================================================
roomPlanner.addItem = function(item) {
  selectedItems.push(item);
  this.total = calculateTotal(selectedItems);
};

roomPlanner.removeItem = function(index) {
  // Remove item at the given index
  var newItems = [];
  for (var i = 0; i < selectedItems.length; i++) {
    if (i !== index) {
      newItems.push(selectedItems[i]);
    }
  }
  selectedItems = newItems;
  this.total = calculateTotal(selectedItems);
};

// ============================================================
// FUNCTION WITH PARAMETERS AND RETURN VALUE
// Demonstrates: function parameters, return types, loops, operators
// ============================================================
function calculateTotal(items) {
  var total = 0;                              // Statement, variable declaration
  for (var i = 0; i < items.length; i++) {    // Loop and iteration
    total = total + items[i].price;           // Arithmetic operator (+)
  }
  return total;                               // Function return value
}

// ============================================================
// FUNCTION WITH PARAMETERS AND RETURN VALUE
// Demonstrates: parameters, return, arithmetic operator (-)
// ============================================================
function getRemainingBudget(budget, total) {
  return budget - total;
}

// ============================================================
// DOM MANIPULATION, CONDITIONAL STATEMENTS
// Demonstrates: DOM, conditionals, operators, classes
// ============================================================
function updateBudgetDisplay(total, currentBudget) {
  // DOM: select elements by ID
  var totalEl = window.document.getElementById('budget-total');
  var budgetEl = window.document.getElementById('budget-amount');
  var statusEl = window.document.getElementById('budget-status');

  // Update text content using DOM
  totalEl.textContent = '₹' + total;
  budgetEl.textContent = '₹' + currentBudget;

  // Calculate remaining using function
  var remaining = getRemainingBudget(currentBudget, total);

  // CONDITIONAL STATEMENT — check if budget is exceeded
  if (remaining >= 0) {
    statusEl.textContent = '₹' + remaining + ' remaining';
    statusEl.className = 'budget-ok';
  } else {
    // Operators: comparison and arithmetic
    var exceeded = total - currentBudget;
    statusEl.textContent = 'Budget Exceeded by ₹' + exceeded;
    statusEl.className = 'budget-exceeded';
  }
}

// ============================================================
// DOM MANIPULATION — render the selected items list
// Demonstrates: DOM (createElement, appendChild, textContent, 
// classList, remove), loops, arrays, objects, event handling
// ============================================================
function renderSelectedItems() {
  var listEl = window.document.getElementById('selected-items-list');
  var emptyMsg = window.document.getElementById('empty-selection-msg');

  // Clear existing items from the DOM
  // Keep the empty message element, remove all selected-item-row elements
  var existingRows = listEl.getElementsByClassName('selected-item-row');
  // Loop backwards to safely remove elements
  for (var i = existingRows.length - 1; i >= 0; i--) {
    existingRows[i].remove();
  }

  // Conditional: show/hide empty message
  if (selectedItems.length === 0) {
    if (emptyMsg) {
      emptyMsg.style.display = 'block';
    }
  } else {
    if (emptyMsg) {
      emptyMsg.style.display = 'none';
    }

    // LOOP — iterate over selectedItems array to create DOM elements
    for (var j = 0; j < selectedItems.length; j++) {
      var item = selectedItems[j];   // Object access

      // DOM: createElement
      var row = window.document.createElement('div');
      row.className = 'selected-item-row';  // DOM: className

      var nameSpan = window.document.createElement('span');
      nameSpan.className = 'selected-item-name';
      nameSpan.textContent = item.title;     // DOM: textContent

      var priceSpan = window.document.createElement('span');
      priceSpan.className = 'selected-item-price';
      priceSpan.textContent = '₹' + item.price;

      // Remove button with event handler (callback)
      var removeBtn = window.document.createElement('button');
      removeBtn.className = 'btn btn-remove btn-small';
      removeBtn.textContent = 'Remove';
      removeBtn.type = 'button';

      // Store the index for the remove callback
      removeBtn.setAttribute('data-index', j);

      // EVENT HANDLING with CALLBACK
      // handleRemoveClick is passed as a callback to addEventListener
      removeBtn.addEventListener('click', handleRemoveClick);

      // DOM: appendChild
      row.appendChild(nameSpan);
      row.appendChild(priceSpan);
      row.appendChild(removeBtn);
      listEl.appendChild(row);
    }
  }

  // Read current budget and update display
  var budgetInput = window.document.getElementById('room-budget');
  budget = Number(budgetInput.value) || 0;
  var total = calculateTotal(selectedItems);
  updateBudgetDisplay(total, budget);

  // JSON — serialize selected items into hidden form field
  var itemsField = window.document.getElementById('items-json');
  itemsField.value = JSON.stringify(selectedItems);
}

// ============================================================
// CALLBACK FUNCTION — for remove button click events
// Demonstrates: callbacks, event handling, DOM attributes
// ============================================================
function handleRemoveClick(event) {
  var button = event.target;
  var index = Number(button.getAttribute('data-index'));
  roomPlanner.removeItem(index);
  renderSelectedItems();
}

// ============================================================
// CALLBACK FUNCTION — for add button click events
// Demonstrates: callbacks, event handling, object creation,
// adding properties to objects, data types
// ============================================================
function handleAddClick(event) {
  var button = event.target;
  var pinId = button.getAttribute('data-pin-id');

  // Find the parent item container using DOM
  var itemContainer = window.document.getElementById('available-pin-' + pinId);

  if (!itemContainer) {
    return;
  }

  // OBJECT CREATION — create an item object from DOM data attributes
  var item = {
    pinId: itemContainer.getAttribute('data-id'),           // String (data type)
    title: itemContainer.getAttribute('data-title'),         // String
    price: Number(itemContainer.getAttribute('data-price')), // Number (primitive type)
    imageUrl: itemContainer.getAttribute('data-image')       // String
  };

  // ADDING PROPERTIES TO OBJECTS — dynamically add a property
  item.addedAt = new Date().toLocaleString();

  // Check if item is already added (using loop and conditional)
  var alreadyAdded = false;
  for (var i = 0; i < selectedItems.length; i++) {
    if (selectedItems[i].pinId === item.pinId) {
      alreadyAdded = true;
      break;
    }
  }

  if (alreadyAdded === false) {
    // Use the object method to add the item
    roomPlanner.addItem(item);

    // DOM: add class to mark item as added
    itemContainer.className = itemContainer.className + ' added';

    // Re-render the selected items list
    renderSelectedItems();
  }
}

// ============================================================
// EVENT HANDLING — attach click handlers to all "Add" buttons
// Demonstrates: DOM selection, loops, event handling, callbacks
// ============================================================
var addButtons = window.document.getElementsByClassName('btn-add-item');
for (var k = 0; k < addButtons.length; k++) {
  // handleAddClick is passed as a callback argument
  addButtons[k].addEventListener('click', handleAddClick);
}

// ============================================================
// EVENT HANDLING — budget input change
// Demonstrates: event handling, callbacks, DOM
// ============================================================
var budgetInput = window.document.getElementById('room-budget');
if (budgetInput) {
  // Callback function for budget change
  function handleBudgetChange() {
    budget = Number(budgetInput.value) || 0;
    var total = calculateTotal(selectedItems);
    updateBudgetDisplay(total, budget);
  }

  budgetInput.addEventListener('change', handleBudgetChange);
  budgetInput.addEventListener('input', handleBudgetChange);
}

// ============================================================
// EVENT HANDLING — save room form submission
// Demonstrates: event handling, JSON, callbacks
// ============================================================
var saveBtn = window.document.getElementById('save-room-btn');
if (saveBtn) {
  // Callback for save button
  function handleSaveRoom(event) {
    // Read room name
    var nameInput = window.document.getElementById('room-name');
    var typeInput = window.document.getElementById('room-type');

    // Validate using conditional statements
    if (!nameInput.value || nameInput.value.length === 0) {
      event.preventDefault();
      return;
    }

    if (!typeInput.value || typeInput.value.length === 0) {
      event.preventDefault();
      return;
    }

    // JSON — serialize selectedItems array into hidden field
    var itemsField = window.document.getElementById('items-json');
    itemsField.value = JSON.stringify(selectedItems);

    // Form submits normally — no fetch() needed
  }

  saveBtn.addEventListener('click', handleSaveRoom);
}

// ============================================================
// ENUMERATING PROPERTIES — demonstrate for...in on an object
// Used to display room planner configuration information
// ============================================================
function logRoomPlannerState() {
  // Enumerating properties of the roomPlanner object
  for (var prop in roomPlanner) {
    // Only enumerate own data properties (not methods)
    if (typeof roomPlanner[prop] !== 'function') {
      // This demonstrates enumerating object properties
      // The values can be used for debugging or display
    }
  }
}
