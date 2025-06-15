const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function(app) {

  console.log('[Proxy] setupProxy.js loaded');
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};