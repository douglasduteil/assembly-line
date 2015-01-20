'use strict';

var argv = require('yargs').argv;
var resolve = require("resolve");

// So wrong ...
var config = require("./config")();

module.exports = function(){
  ////
  // Require all available factories

  // extract the ending arguments with the eArgv flag 'cause gulp-cli
  // keeps on parsing args after the '--'
  // Note: by convention argv is an array, so is eArgv.
  var endingArgv = (argv.eArgv ||  '').split(' ');

  Object
    .keys(config.factories || {})
    .map(function toFactoryPath(factoryName){
      try { return resolve.sync(factoryName, { basedir: process.cwd() });}
      catch (err) { return ''; }
    })
    .filter(function onlyValidePath(factoryPath){
      // only launch existing factorys
      return !!factoryPath;
    })
    .map(function requireFactory(factoryPath){
      require(factoryPath)(config, endingArgv);
    });
}
