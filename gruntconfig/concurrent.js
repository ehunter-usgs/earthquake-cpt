'use strict';

var concurrent = {
  build: [
    'browserify:index',
    'browserify:data',
    'copy:build',
    'copy:leaflet',
    'copy:cluster',
    'compass:build'
  ],

  dist: [
    'copy:dist',
    'uglify',
    'cssmin'
  ]
};

module.exports = concurrent;
