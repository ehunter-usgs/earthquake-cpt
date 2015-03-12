'use strict';

module.exports = function (grunt) {
  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'concurrent:build' // browserify:index, copy:build, compass:build
  ]);

  grunt.registerTask('dist', [
    'build',
    'concurrent:dist', // copy:dist, uglify, cssmin

    'configureProxies:dist',
    'connect:template',
    'connect:data',
    'connect:dist:keepalive'
  ]);

  grunt.registerTask('default', [
    'build',

    'configureProxies:build',
    'connect:template',
    'connect:data',
    'connect:build',
    'watch'
  ]);
};
