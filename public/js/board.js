// boards.js — confirmation for destructive board actions
// Loaded on /boards and /boards/:id. Intercepts any form with a data-confirm
// attribute and asks the user before letting the submission go through.
(function() {
  var doc = window.document;

  doc.addEventListener('submit', function(ev) {
    var form = ev.target;
    if (!form || form.tagName !== 'FORM') return;
    var msg = form.getAttribute('data-confirm');
    if (!msg) return;
    if (!window.confirm(msg)) {
      ev.preventDefault();
    }
  });
})();