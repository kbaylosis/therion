"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Start the server
_app2.default.listen(3000, function () {
  console.log(_fs2.default.readFileSync(_path2.default.join(__dirname, "../assets/logo")).toString());
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});