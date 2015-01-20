'use strict';

var path = require('path');
var extend = require('util')._extend;

var cwdPkg = (function(){
  try{ return require(path.join(process.cwd(), 'package.json')); }
  catch (e) { return {}; }
}());

////

var DEFAULTS = {
  factory: {
    prefix: 'indl'
  },
  factories: {},
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

DEFAULTS.factory.prefixRegex = new Regex('^' + DEFAULTS.factory.prefix);

////

// cache
var config = extend({}, DEFAULTS);

// Getter/Overrider
module.exports = function(data){

  if (!data){
    return config;
  }

  extend(config, data);

  // Low the matched devDependencies first
  extend(config.factories, extractedMakinaFromDevDependencies());
  // But priority to the ngFacto meta key
  extend(config.factories, cwdPkg[config.factory.prefix] && cwdPkg[config.factory.prefix]);

  return config;
}


function extractedFactoriesFromDevDependencies(){
  return Object
    .keys(cwdPkg.devDependencies || {})
    .filter(function(depName){
      return config.factory.prefixRegex.test(depName);
    })
    .reduce(function rebuildObject(memo, depName){
      memo[depName] = cwdPkg.devDependencies[depName];
      return memo;
    }, {});
}
