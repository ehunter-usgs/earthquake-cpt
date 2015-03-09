'use strict';

var gruntConfig = {

  browserify: require('./browserify'),
  clean: require('./clean'),
  compass: require('./compass'),
  connect: require('./connect'),
  copy: require('./copy'),
  watch: require('./watch'),

  tasks: [
    'grunt-browserify',
    'grunt-contrib-clean',
    'grunt-contrib-compass',
    'grunt-contrib-connect',
    'grunt-contrib-copy',
    'grunt-contrib-watch'
  ]
};

module.exports = gruntConfig;
