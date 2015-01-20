'use strict';

var util = require('util');

var npm = require('npm');
var resolve = require("resolve");

var gulp = (function(){
  try{
    return require(resolve.sync('gulp', { basedir: process.cwd() }));
  }catch(e){
    return { task: function(){ util.print('WARN: No gulp found...'); } };
  }
}());

var config = require("./config")();

////
// The install task.
// Will install all the described "indl-*" form the package.json
// and all the modules under the "indl" meta-key.

gulp.task(config.prefix + ':install', function(cb){

  npm.load(null, function(er){
    if (er) return cb(er);

    var makinasVersions = Object
      .keys(targetPkg.ngFacto.makinas)
      .map(function(makinaName){
        return makinaName + '@' + targetPkg.ngFacto.makinas[makinaName];
      });

    npm.commands.install(makinasVersions,
      function(er){
        if (er) return cb(er);
        cb();
      }
    );

  });
});
