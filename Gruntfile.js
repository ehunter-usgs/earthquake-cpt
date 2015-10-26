'use strict';

module.exports = function (grunt) {
  var gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);

  grunt.registerTask('build', [
    'clean',
    'jshint',
    'browserify:index',
    'browserify:data',
    'copy:build',
    'copy:leaflet',
    'postcss:dev'
  ]);

  grunt.registerTask('builddist', [
    'build',

    'copy:dist',
    'uglify',
    'postcss:dist'
  ]);

  grunt.registerTask('dist', [
    'builddist',

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
