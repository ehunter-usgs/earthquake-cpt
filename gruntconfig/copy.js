'use strict';

var config = require('./config');

var copy = {
  build: {
    expand: true,
    cwd: config.src,
    dest: config.build + '/' + config.src,
    src: [
      'htdocs/index.html',
      'htdocs/js/index.js'
    ]
  }
};

module.exports = copy;
