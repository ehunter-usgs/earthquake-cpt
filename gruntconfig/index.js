'use strict';

var gruntConfig = {

  connect: require('./connect'),
  copy: require('./copy'),
  watch: require('./watch'),

  tasks: [
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-watch'
  ]
};

module.exports = gruntConfig;
