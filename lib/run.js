'use strict';

var argv = require('yargs').argv;
var resolve = require('resolve');


////
// Require all available machines

module.exports = function () {


  this.log.debug('Runs machines %j', this.factory.machines);


  // extract the ending arguments with the eArgv flag 'cause gulp-cli
  // keeps on parsing args after the '--'
  // Note: by convention argv is an array, so is eArgv.
  var endingArgv = (argv.eArgv || '').split(' ');

  this.factory.machines
    .map(function toMachinePath(machineName) {
      try { return resolve.sync(machineName, { basedir: process.cwd() });}
      catch (err) { return ''; }
    })
    .filter(function onlyValidPath(machinePath) {
      // only launch existing machines
      return !!machinePath;
    })
    .map(function (factoryPath) {
      require(factoryPath).call(this, endingArgv);
    }.bind(this));
};

