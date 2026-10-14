// controllers/boardController.js
// Handles board operations: list, create, detail, add pin to board
// All boards belong to the logged-in user

var Board = require('../models/Board');

// GET /boards — Display only the logged-in user's boards
var getBoards = function(req, res) {
  var userId = req.session.user._id;

  Board.find({ createdBy: userId })
    .populate('pins')
    .lean()
    .then(function(boards) {
      res.render('boards', {
        title: 'Boards - PinNest',
        boards: boards,
        activePage: 'boards'
      });
    })
    .catch(function(err) {
      console.log('Error fetching boards:', err.message);
      res.render('boards', {
        title: 'Boards - PinNest',
        boards: [],
        activePage: 'boards'
      });
    });
};

// POST /boards/create — Create a new board owned by the logged-in user
var postCreateBoard = function(req, res) {
  var newBoard = new Board({
    name: req.body.name,
    description: req.body.description || '',
    pins: [],
    createdBy: req.session.user._id
  });

  newBoard.save()
    .then(function() {
      res.redirect('/boards');
    })
    .catch(function(err) {
      console.log('Error creating board:', err.message);
      res.redirect('/boards');
    });
};

// GET /boards/:id — Display a single board with its pins
var getBoardDetail = function(req, res) {
  var boardId = req.params.id;
  var userId = req.session.user._id;

  Board.findById(boardId)
    .populate('pins')
    .lean()
    .then(function(board) {
      if (!board) {
        return res.redirect('/boards');
      }

      // Ownership check — a user can only open their own boards
      if (!board.createdBy || board.createdBy.toString() !== userId) {
        return res.redirect('/boards');
      }

      res.render('boardDetail', {
        title: board.name + ' - PinNest',
        board: board,
        activePage: 'boards'
      });
    })
    .catch(function(err) {
      console.log('Error fetching board:', err.message);
      res.redirect('/boards');
    });
};

// POST /boards/:id/add-pin — Add a pin to a board
var postAddPinToBoard = function(req, res) {
  var boardId = req.params.id;
  var pinId = req.body.pinId;
  var userId = req.session.user._id;

  Board.findById(boardId)
    .then(function(board) {
      if (!board) {
        return res.redirect('/boards');
      }

      // Ownership check — a user can only add pins to their own boards
      if (!board.createdBy || board.createdBy.toString() !== userId) {
        return res.redirect('/boards');
      }

      // Check if pin is already in the board
      var alreadyAdded = false;
      for (var i = 0; i < board.pins.length; i++) {
        if (board.pins[i].toString() === pinId) {
          alreadyAdded = true;
          break;
        }
      }

      if (!alreadyAdded) {
        board.pins.push(pinId);
        return board.save().then(function() {
          res.redirect('/boards/' + boardId);
        });
      } else {
        res.redirect('/boards/' + boardId);
      }
    })
    .catch(function(err) {
      console.log('Error adding pin to board:', err.message);
      res.redirect('/boards');
    });
};

// POST /boards/:id/delete — Delete a board entirely (ownership enforced)
var postDeleteBoard = function(req, res) {
  var boardId = req.params.id;
  var userId = req.session.user._id;

  Board.findById(boardId)
    .then(function(board) {
      if (!board) {
        return res.redirect('/boards');
      }

      // Ownership check — a user can only delete their own boards
      if (!board.createdBy || board.createdBy.toString() !== userId) {
        return res.redirect('/boards');
      }

      // deleteOne on the document — safer than Board.findByIdAndDelete
      // because ownership check has already happened above
      return board.deleteOne().then(function() {
        res.redirect('/boards');
      });
    })
    .catch(function(err) {
      console.log('Error deleting board:', err.message);
      res.redirect('/boards');
    });
};

// POST /boards/:id/remove-pin — Remove a single pin from a board
// The pin document itself is untouched — just the reference on this board
var postRemovePinFromBoard = function(req, res) {
  var boardId = req.params.id;
  var pinId = req.body.pinId;
  var userId = req.session.user._id;

  Board.findById(boardId)
    .then(function(board) {
      if (!board) {
        return res.redirect('/boards');
      }

      // Ownership check
      if (!board.createdBy || board.createdBy.toString() !== userId) {
        return res.redirect('/boards');
      }

      // Rebuild pins array without the removed pin (loop-based to keep
      // the code style consistent with postRemoveItem on rooms)
      var filtered = [];
      for (var i = 0; i < board.pins.length; i++) {
        if (board.pins[i].toString() !== pinId) {
          filtered.push(board.pins[i]);
        }
      }
      board.pins = filtered;

      return board.save().then(function() {
        res.redirect('/boards/' + boardId);
      });
    })
    .catch(function(err) {
      console.log('Error removing pin from board:', err.message);
      res.redirect('/boards/' + boardId);
    });
};

module.exports = {
  getBoards: getBoards,
  postCreateBoard: postCreateBoard,
  getBoardDetail: getBoardDetail,
  postAddPinToBoard: postAddPinToBoard,
  postDeleteBoard: postDeleteBoard,
  postRemovePinFromBoard: postRemovePinFromBoard
};