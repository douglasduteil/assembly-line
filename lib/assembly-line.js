'use strict';

var path = require('path');
var merge = require('merge');

var log4js = require('log4js');

var targetPkg = (function () {
  try { return require(path.join(process.cwd(), 'package.json')); }
  catch (e) { return {}; }
}());

////

module.exports = AssemblyLine;

////

function AssemblyLine(config) {
  merge.recursive(this, {
      factory: {
        machineryDependencyRegex: /-machinery$/,
        machines: [],
        verbose: false
      },
      config: {
      },
      pkg: targetPkg
    },
    config
  );

  //
  this.factory.machines = this.factory.machines.concat(
    machineryDevDependencyMachines(this.factory.machineryDependencyRegex)
  );

  //
  this.log = log4js.getLogger('AssemblyLine');
  this.log.setLevel(this.factory.verbose ? 'DEBUG' : 'OFF');

  this.log.debug('initialized with %j', this);
}

AssemblyLine.prototype.run = require('./run');


////


function machineryDevDependencyMachines(machineryDependencyRegex) {
  return Object
    .keys(targetPkg.devDependencies || {})
    .filter(function (depName) {
      return machineryDependencyRegex.test(depName);
    });
}


