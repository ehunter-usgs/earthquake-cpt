'use strict';

var config = require('./config');

var cssmin = {
  index: {
    src: [config.build + '/' + config.src + '/htdocs/css/index.css'],
    dest: config.dist + '/htdocs/css/index.css'
  },

  data: {
    src: [config.build + '/' + config.src + '/htdocs/css/data.css'],
    dest: config.dist + '/htdocs/css/data.css'
  }
};

module.exports = cssmin;
