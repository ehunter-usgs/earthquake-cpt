'use strict';

var config = require('./config');

var compass = {
  build: {
    options: {
      sassDir: config.src,
      cssDir: config.build + '/' + config.src,
      environment: 'development',
      importPath: [
        process.cwd() + '/node_modules/hazdev-webutils/src'
      ]
    }
  }
};

module.exports = compass;
