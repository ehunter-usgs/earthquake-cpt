'use strict';

module.exports = function (grunt) {
  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', [
    'clean',
    'jshint',
    'configureProxies:build',
    'concurrent:build', // browserify:index, copy:build, compass:build
    'connect:template',
    'connect:data',
    'connect:build',
    'watch'
  ]);
};
