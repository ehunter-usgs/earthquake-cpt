'use strict';

var gruntConfig = {

  connect: require('./connect'),
  copy: require('./copy'),

  tasks: [
    'grunt-contrib-connect',
    'grunt-contrib-copy'
  ]
};

module.exports = gruntConfig;
