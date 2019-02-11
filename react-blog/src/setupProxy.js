const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://127.0.0.1:7001', changeOrigin: true }));
  app.use(proxy('/*.svg', { target: 'http://127.0.0.1:7001', changeOrigin: true }));
};