'use strict';

var config = require('./config');

var copy = {
  build: {
    expand: true,
    cwd: config.src,
    dest: config.build,
    src: [
      'htdocs/index.html',
      'htdocs/js/index.js',
      'htdocs/css/index.css'
    ]
  }
};

module.exports = copy;
