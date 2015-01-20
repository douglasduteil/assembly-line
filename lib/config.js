'use strict';

var extend = require("util")._extend;

var DEFAULTS = {
  factory:{
    makinaPrefixRegex: /^dummy-makina/
  },
  src : {
    cwd: 'src',
    tmp : '.tmp',
    scripts: '{scripts,modules/*}/**/*.js'
  },
  scriptBaseProcess : {
    pattern: false,
    transform: function fakeTransformer(){ return {}; },
    transformOptions: null
  }
};

// cache
var config = extend({}, DEFAULTS);

// Getter/Overrider
module.exports = function(data){
  return data ? extend(config, data) : config;
}
