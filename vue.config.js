'use strict'
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  assetsDir: './', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  productionSourceMap: false, // 是否为生产环境构建生成 source map
  css: {
    loaderOptions: {
      css: {
        importLoaders: 1
      },
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

    if (process.env.npm_config_analyzer === 'true') {
      // npm run serve --analyzer
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.output.filename = `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
      config.output.chunkFilename = `[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`

      // 拆包
      config.optimization.splitChunks = {
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true, // 复用存在的模块
            maxSize: 102400, // 超过 10kb 分包
            // enforce: true // 忽略minSize、maxSize、maxAsyncRequests、maxInitalRequests等限制条件直接打包。
          },
          antDesignVue: {
            name: 'chunk-ant-design-vue',
            test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
            chunks: 'initial',
            priority: 3,
            reuseExistingChunk: true, // 复用存在的模块
            enforce: true // 忽略minSize、maxSize、maxAsyncRequests、maxInitalRequests等限制条件直接打包。
          }
        }
      }
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            '\\.(' + productionGzipExtensions.join('|') + ')$'
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10K
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
    } else {
      // 为开发环境修改配置...
      config.devtool = 'inline-source-map'
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('snapsvg')
      .test(resolve('snapsvg/dist/snap.svg.js'))
      .use('imports-loader?this=>window,fix=>module.exports=0')
      .loader('imports-loader')
      .end()
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
