const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'
  },
  configureWebpack: {
    plugins: [
      new SWPrecacheWebpackPlugin({
        cacheId: 'meetings',
        filename: 'service-worker-cache.js',
        staticFileGlobs: ['dist/**/*.*', '/'],
        minify: true,
        stripPrefix: 'dist/',
        dontCacheBustUrlsMatching: /\.\w{6}\./
      })
    ]
  }
}
