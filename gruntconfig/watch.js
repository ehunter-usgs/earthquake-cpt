'use strict';

var config = require('./config');

var watch = {
  resources: {
    files: [
      config.src + '/htdocs/index.html',
      config.src + '/htdocs/js/index.js'
    ],
    tasks: [
      'copy:build'
    ]
  },

  compass: {
    files: [
      config.src + '/htdocs/**/*.scss'
    ],
    tasks: [
      'compass:build'
    ]
  },

  livereload: {
    options: {
      livereload: config.liveReloadPort
    },
    files: [
      config.build + '/' + config.src + '/htdocs/index.html',
      config.build + '/' + config.src + '/htdocs/css/index.css',
      config.build + '/' + config.src + '/htdocs/js/index.js'
    ]
  }
};

module.exports = watch;
