'use strict';

var gruntConfig = {

  clean: require('./clean'),
  connect: require('./connect'),
  copy: require('./copy'),
  watch: require('./watch'),

  tasks: [
    'grunt-contrib-clean',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-watch'
  ]
};

module.exports = gruntConfig;
