'use strict';

var concurrent = {
  build: [
    'browserify:index',
    'browserify:data',
    'copy:build',
    'copy:leaflet',
    'compass:build'
  ]
};

module.exports = concurrent;
