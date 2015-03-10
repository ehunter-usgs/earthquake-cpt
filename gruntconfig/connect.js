'use strict';

var config = require('./config');

var iniConfig = require('ini').parse(require('fs')
    .readFileSync(config.src + '/conf/config.ini', 'utf-8'));

var rewrites = [
  {
    from: '^/data/?(\\w+)?/?(table|map)?/?$',
    to: iniConfig.MOUNT_PATH + '/data.php?region=$1&display=$2'
  }
];

var addMiddleware = function (connect, options, middlewares) {
  middlewares.unshift(
    require('grunt-connect-proxy/lib/utils').proxyRequest,
    require('http-rewrite-middleware').getMiddleware(rewrites),
    require('gateway')(options.base[0], {
      '.php': 'php-cgi',
      'env': {
        'PHPRC': 'node_modules/hazdev-template/dist/conf/php.ini'
      }
    })
  );
  return middlewares;
};


var connect = {
  options: {
    hostname: '*'
  },

  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: config.templatePort,
      rewrite: {
        '^/theme': ''
      }
    }
  ],

  build: {
    options: {
      base: [config.build + '/' + config.src + '/htdocs'],
      livereload: config.liveReloadPort,
      middleware: addMiddleware,
      open: 'http://localhost:' + config.buildPort + '/index.php',
      port: config.buildPort
    }
  },

  template: {
    options: {
      base: ['node_modules/hazdev-template/dist/htdocs'],
      port: config.templatePort
    }
  }
};

module.exports = connect;
