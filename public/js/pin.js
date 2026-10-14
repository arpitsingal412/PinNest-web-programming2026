// pin.js — Pin detail page JavaScript
// Demonstrates: DOM, event handling, callbacks, conditionals

// Handle the "Save to Board" form
// Updates the form action based on the selected board

var boardSelect = window.document.getElementById('board-select');
var saveForm = window.document.getElementById('save-to-board-form');

if (boardSelect && saveForm) {
  // Callback function for board selection change
  function handleBoardSelect() {
    var selectedBoardId = boardSelect.value;
    
    // Conditional: only set action if a board is selected
    if (selectedBoardId && selectedBoardId.length > 0) {
      saveForm.action = '/boards/' + selectedBoardId + '/add-pin';
    }
  }

  // Event handling — callback passed to addEventListener
  boardSelect.addEventListener('change', handleBoardSelect);

  // Set initial form action
  handleBoardSelect();
}