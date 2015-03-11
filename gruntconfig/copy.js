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
  },

  cluster: {
    cwd: process.cwd() + '/node_modules/leaflet.markercluster/dist',
    dest: config.build + '/' + config.src + '/htdocs/css',
    expand: true,
    src: [
      'MarkerCluster.Default.css'
    ]
  },

  dist: {
    cwd: config.build + '/' + config.src,
    dest: config.dist,
    expand: true,
    src: [
      'conf/config.inc.php',

      'htdocs/css/images/**/*',
      'htdocs/images/**/*',
      'htdocs/*.html',
      'htdocs/*.php',

      'lib/**/*'
    ]
  }
};

module.exports = copy;
