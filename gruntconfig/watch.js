'use strict';

var config = require('./config');

var watch = {
  resources: {
    files: [
      config.src + '/htdocs/index.html',
      config.src + '/htdocs/css/index.css',
      config.src + '/htdocs/js/index.js'
    ],
    tasks: [
      'copy:build'
    ]
  },

  livereload: {
    options: {
      livereload: config.liveReloadPort
    },
    files: [
      config.build + '/htdocs/index.html',
      config.build + '/htdocs/css/index.css',
      config.build + '/htdocs/js/index.js'
    ]
  }
};

module.exports = watch;
