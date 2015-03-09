'use strict';

module.exports = function (grunt) {
  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.registerTask('default', [
    'clean',
    'copy:build',
    'compass:build',
    'connect:build',
    'watch'
  ]);
};
