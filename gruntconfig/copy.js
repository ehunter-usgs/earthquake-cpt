'use strict';

var config = require('./config');

var copy = {
  build: {
    cwd: config.src,
    dest: config.build + '/' + config.src,
    expand: true,
    src: [
      '**/*',
      '!**/*.scss',
      '!**/*.js'
    ]
  },

  leaflet: {
    cwd: process.cwd() + '/node_modules/leaflet/dist',
    dest: config.build + '/' + config.src + '/htdocs/css',
    expand: true,
    src: [
      'leaflet.css',
      'images/*'
    ]
  }
};

module.exports = copy;
