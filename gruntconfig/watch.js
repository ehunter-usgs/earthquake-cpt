'use strict';

var config = require('./config');

var watch = {
  resources: {
    files: [
      config.src + '/**/*',
      '!' + config.src + '/**/*.scss',
      '!' + config.src + '/**/*.js'
    ],
    tasks: [
      'copy:build'
    ]
  },

  stylesheets: {
    files: [
      config.src + '/htdocs/**/*.scss'
    ],
    tasks: [
      'postcss:dev'
    ]
  },

  scripts: {
    files: [
      config.src + '/htdocs/**/*.js'
    ],
    tasks: [
      'jshint:scripts',
      'browserify:index',
      'browserify:data',
    ]
  },

  gruntfile: {
    files: [
      'Gruntfile.js',
      'gruntconfig/**/*.js'
    ],
    tasks: [
      'jshint:gruntfile'
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
