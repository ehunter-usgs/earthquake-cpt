'use strict';

var concurrent = {
  build: [
    'browserify:index',
    'browserify:data',
    'copy:build',
    'copy:leaflet',
    'copy:cluster',
    'compass:build'
  ]
};

module.exports = concurrent;
