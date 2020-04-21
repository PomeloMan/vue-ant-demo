'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: './', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 'primary-color': '#00C6C6',
          // 'heading-color': '#303133',
          'text-color': '#333333'
          // 'link-color': '#1DA57A',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true
      }
    }
  },

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': resolve('src'),
  //       '@assets': resolve('src/assets')
  //     }
  //   }
  // },
  configureWebpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    config.resolve.alias['@assets'] = path.resolve(__dirname, 'src/assets')
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },

  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  // 设置代理
  devServer: {
    host: '127.0.0.1',
    port: 8000,
    proxy: {
      '/api/user': {
        target: process.env.VUE_APP_USER_SERVER_PROXY_URL, //代理接口
        changeOrigin: true,
        headers: { // 解决POST请求403的问题，给请求头添加ORIGIN字段
          host: process.env.VUE_APP_USER_SERVER_PROXY_URL,
          origin: process.env.VUE_APP_USER_SERVER_PROXY_URL
        },
        pathRewrite: {
          '^/api/user': '/' //代理的路径
        }
      },
    }
  }
}
