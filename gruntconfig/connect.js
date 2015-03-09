'use strict';

var config = require('./config');

var connect = {
  build: {
    options: {
      base: [config.build + '/' + config.src + '/htdocs'],
      livereload: config.liveReloadPort,
      open: 'http://localhost:' + config.buildPort + '/index.html',
      port: config.buildPort
    }
  }
};

module.exports = connect;
