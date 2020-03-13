const { createProxyMiddleware  } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:4000',
      changeOrigin: true,
      onProxyReq(proxyReq) {
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', 'http://localhost:4000')
        }
      },
      pathRewrite: { '^/api': '' },
      logLevel: 'debug',
    })
  )
}