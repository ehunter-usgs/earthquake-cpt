'use strict';

var config = require('./config');

var iniConfig = require('ini').parse(require('fs')
    .readFileSync(config.src + '/conf/config.ini', 'utf-8'));

var dataProxyRewrite = {};
dataProxyRewrite['^' + iniConfig.MOUNT_PATH + '/data'] = '';

var rewrites = [
  {
    from: '^' + iniConfig.MOUNT_PATH + '/data/?(\\w+)?/?(table|map)?/?$',
    to: '/data.php?region=$1&display=$2'
  },

  // analagous to httpd.conf alias
  {
    from: '^' + iniConfig.MOUNT_PATH + '/?(.*)$',
    to: '/$1'
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

  // localhosts running on separate ports
  build: {
    options: {
      base: [config.build + '/' + config.src + '/htdocs'],
      livereload: config.liveReloadPort,
      middleware: addMiddleware,
      open: 'http://localhost:' + config.buildPort + iniConfig.MOUNT_PATH + '/index.php',
      port: config.buildPort
    }
  },

  dist: {
    options: {
      base: [config.dist + '/htdocs'],
      middleware: addMiddleware,
      open: 'http://localhost:' + config.distPort + iniConfig.MOUNT_PATH + '/index.php',
      port: config.distPort
    }
  },

  template: {
    options: {
      base: ['node_modules/hazdev-template/dist/htdocs'],
      port: config.templatePort
    }
  },

  data: {
    options: {
      base: [iniConfig.DATA_DIR],
      port: config.dataPort
    }
  },

  // proxy definitions for build server to route requests to correct localhost
  proxies: [
    {
      context: '/theme/',
      host: 'localhost',
      port: config.templatePort,
      rewrite: {
        '^/theme': ''
      }
    },
    {
      context: iniConfig.MOUNT_PATH + '/data/pdf',
      host: 'localhost',
      port: config.dataPort,
      rewrite: dataProxyRewrite
    },
    {
      context: iniConfig.MOUNT_PATH + '/data/txt',
      host: 'localhost',
      port: config.dataPort,
      rewrite: dataProxyRewrite
    }
  ]
};

module.exports = connect;
