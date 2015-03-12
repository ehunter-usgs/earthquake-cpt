'use strict';

var config = require('./config');

var browerify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        process.cwd() + '/' + config.src + '/htdocs/js',
        process.cwd() + '/node_modules/leaflet/dist',
        process.cwd() + '/node_modules/leaflet.markercluster/dist',
        process.cwd() + '/node_modules/hazdev-webutils/src'
      ]
    }
  },

  index: {
    src: [config.src + '/htdocs/js/index.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/index.js'
  },

  data: {
    src: [config.src + '/htdocs/js/data.js'],
    dest: config.build + '/' + config.src + '/htdocs/js/data.js'
  }
};

module.exports = browerify;
