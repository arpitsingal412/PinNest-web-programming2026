// main.js — Shared JavaScript for PinNest
// Demonstrates: Window Objects, DOM, statements, keywords

// Window Object demonstration
var doc = window.document;

// DOM: Select the current page's navigation link and mark it active
var currentPath = window.document.location.pathname;
var navLinks = doc.getElementsByClassName('nav-link');

for (var i = 0; i < navLinks.length; i++) {
  var link = navLinks[i];
  var href = link.getAttribute('href');
  
  if (currentPath === href) {
    link.className = link.className + ' nav-active';
  }
}
