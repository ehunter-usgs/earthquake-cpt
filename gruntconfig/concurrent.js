'use strict';

var concurrent = {
  build: [
    'browserify:index',
    'copy:build',
    'compass:build'
  ]
};

module.exports = concurrent;
