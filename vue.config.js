
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  assetsDir: './', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
