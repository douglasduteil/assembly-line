'use strict';

var extend = require('util')._extend;
var argv = require('yargs').argv;
var resolve = require('resolve');
var log4js = require('log4js');


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
      try {
        return {
          name: machineName,
          path: resolve.sync(machineName, { basedir: process.cwd() })
        };
      }
      catch (err) { return {}; }
    })
    .filter(function onlyValidPath(machine) {
      // only launch existing machines
      return !!machine.path;
    })
    .map(function (machine) {
      var env = extend(this, {
        log:  log4js.getLogger(this.log.category + '/' + machine.name)
      });
      env.log.debug('calls');
      require(machine.path).call(env, endingArgv);
    }.bind(this));
};

