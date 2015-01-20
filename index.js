'use strict';

var npm = require("npm");
var path = require("path");
var extend = require("util")._extend;

require("./lib/install");
exports.use = require("./lib/use");
