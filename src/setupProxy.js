/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware')

const protocol = 'http'

const hostPort = ''

module.exports = function(app) {
  app.use(
    '/1.0/app',
    createProxyMiddleware({
      target: `${protocol}://${hostPort}`,
      changeOrigin: true,
    }),
  )
}
