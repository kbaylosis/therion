"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Books = require("../mocks/Books.json");

var _Books2 = _interopRequireDefault(_Books);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Query = {
  books: function books() {
    return _Books2.default;
  }
};

exports.default = Query;