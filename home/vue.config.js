const path = require('path')

module.exports = {
  outputDir: '../node/app/public_home',
  indexPath: path.resolve(__dirname, '../node/app/view/home.html'),
  publicPath: process.env.NODE_ENV === 'production' ? 'https://blog-1257169527.file.myqcloud.com/' : '/',
  // 使用 CDN 的资源而不是 node_module
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      axios: 'axios'
    }
  },
  // 代理
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
