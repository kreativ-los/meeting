const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

if (process.env.NODE_ENV === 'production') {
  module.exports = {
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
} else {
  module.exports = {
    devServer: {
      proxy: 'http://localhost:5000'
    }
  }
}
