{
  mode: 'development',
  context: 'D:\\GitRepo\\vue-ant-demo',
  node: {
    setImmediate: false,
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  output: {
    path: 'D:\\GitRepo\\vue-ant-demo\\dist',
    filename: 'js/[name].js',
    publicPath: '/',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    alias: {
      '@': 'D:\\GitRepo\\vue-ant-demo\\src',
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@assets': 'D:\\GitRepo\\vue-ant-demo\\src\\assets'
    },
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json',
      '.wasm'
    ],
    modules: [
      'node_modules',
      'D:\\GitRepo\\vue-ant-demo\\node_modules',
      'D:\\GitRepo\\vue-ant-demo\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp') */
      {}
    ]
  },
  resolveLoader: {
    modules: [
      'D:\\GitRepo\\vue-ant-demo\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
      'node_modules',
      'D:\\GitRepo\\vue-ant-demo\\node_modules',
      'D:\\GitRepo\\vue-ant-demo\\node_modules\\@vue\\cli-service\\node_modules'
    ],
    plugins: [
      /* config.resolve.plugin('pnp-loaders') */
      {}
    ]
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      /* config.module.rule('vue') */
      {
        test: /\.vue$/,
        use: [
          /* config.module.rule('vue').use('cache-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '347e98d2'
            }
          },
          /* config.module.rule('vue').use('vue-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-loader\\lib\\index.js',
            options: {
              compilerOptions: {
                whitespace: 'condense'
              },
              cacheDirectory: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\.cache\\vue-loader',
              cacheIdentifier: '347e98d2'
            }
          }
        ]
      },
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('svg') */
      {
        test: /\.(svg)(\?.*)?$/,
        exclude: [
          'D:\\GitRepo\\vue-ant-demo\\src\\icons'
        ],
        use: [
          /* config.module.rule('svg').use('file-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\file-loader\\dist\\cjs.js',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          /* config.module.rule('media').use('url-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('fonts') */
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\url-loader\\dist\\cjs.js',
            options: {
              limit: 4096,
              fallback: {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\file-loader\\dist\\cjs.js',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      /* config.module.rule('pug') */
      {
        test: /\.pug$/,
        oneOf: [
          /* config.module.rule('pug').oneOf('pug-vue') */
          {
            resourceQuery: /vue/,
            use: [
              /* config.module.rule('pug').oneOf('pug-vue').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          },
          /* config.module.rule('pug').oneOf('pug-template') */
          {
            use: [
              /* config.module.rule('pug').oneOf('pug-template').use('raw') */
              {
                loader: 'raw-loader'
              },
              /* config.module.rule('pug').oneOf('pug-template').use('pug-plain-loader') */
              {
                loader: 'pug-plain-loader'
              }
            ]
          }
        ]
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        oneOf: [
          /* config.module.rule('css').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('css').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('css').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('css').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('css').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('css').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('css').oneOf('normal') */
          {
            use: [
              /* config.module.rule('css').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('css').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('css').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('postcss') */
      {
        test: /\.p(ost)?css$/,
        oneOf: [
          /* config.module.rule('postcss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('postcss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('postcss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('postcss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('postcss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('postcss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          /* config.module.rule('postcss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('postcss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('postcss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('scss') */
      {
        test: /\.scss$/,
        oneOf: [
          /* config.module.rule('scss').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('scss').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('scss').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('scss').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('scss').oneOf('vue').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('scss').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('scss').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('scss').oneOf('normal') */
          {
            use: [
              /* config.module.rule('scss').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('scss').oneOf('normal').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('sass') */
      {
        test: /\.sass$/,
        oneOf: [
          /* config.module.rule('sass').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('sass').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('sass').oneOf('vue-modules').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('sass').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('sass').oneOf('vue').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('sass').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('sass').oneOf('normal-modules').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          },
          /* config.module.rule('sass').oneOf('normal') */
          {
            use: [
              /* config.module.rule('sass').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('sass').oneOf('normal').use('sass-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdSassLoader.js',
                options: {
                  sourceMap: true,
                  sassOptions: {
                    indentedSyntax: true
                  }
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        oneOf: [
          /* config.module.rule('less').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('less').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('vue-modules').use('less-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdLessLoader.js',
                options: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('less').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('less').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('vue').use('less-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdLessLoader.js',
                options: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('less').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('normal-modules').use('less-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdLessLoader.js',
                options: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            ]
          },
          /* config.module.rule('less').oneOf('normal') */
          {
            use: [
              /* config.module.rule('less').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('less').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('less').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('less').oneOf('normal').use('less-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\antd-scss-theme-plugin\\build\\dist\\lib\\antdLessLoader.js',
                options: {
                  sourceMap: true,
                  javascriptEnabled: true
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('stylus') */
      {
        test: /\.styl(us)?$/,
        oneOf: [
          /* config.module.rule('stylus').oneOf('vue-modules') */
          {
            resourceQuery: /module/,
            use: [
              /* config.module.rule('stylus').oneOf('vue-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('stylus').oneOf('vue-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('vue') */
          {
            resourceQuery: /\?vue/,
            use: [
              /* config.module.rule('stylus').oneOf('vue').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('stylus').oneOf('vue').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal-modules') */
          {
            test: /\.module\.\w+$/,
            use: [
              /* config.module.rule('stylus').oneOf('normal-modules').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: {
                    localIdentName: '[name]_[local]_[hash:base64:5]'
                  }
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('stylus').oneOf('normal-modules').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          },
          /* config.module.rule('stylus').oneOf('normal') */
          {
            use: [
              /* config.module.rule('stylus').oneOf('normal').use('vue-style-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\vue-style-loader\\index.js',
                options: {
                  sourceMap: true,
                  shadowMode: false
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('css-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\css-loader\\dist\\cjs.js',
                options: {
                  sourceMap: true,
                  importLoaders: 1
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('postcss-loader') */
              {
                loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\postcss-loader\\src\\index.js',
                options: {
                  sourceMap: true
                }
              },
              /* config.module.rule('stylus').oneOf('normal').use('stylus-loader') */
              {
                loader: 'stylus-loader',
                options: {
                  sourceMap: true,
                  preferPathResolver: 'webpack'
                }
              }
            ]
          }
        ]
      },
      /* config.module.rule('js') */
      {
        test: /\.m?jsx?$/,
        exclude: [
          function () { /* omitted long function */ }
        ],
        use: [
          /* config.module.rule('js').use('cache-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\cache-loader\\dist\\cjs.js',
            options: {
              cacheDirectory: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\.cache\\babel-loader',
              cacheIdentifier: '2aede5bc'
            }
          },
          /* config.module.rule('js').use('babel-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\babel-loader\\lib\\index.js'
          }
        ]
      },
      /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'D:\\GitRepo\\vue-ant-demo\\node_modules\\@vue\\cli-service\\lib'
        ],
        use: [
          /* config.module.rule('eslint').use('eslint-loader') */
          {
            loader: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '0edaa08e',
              emitWarning: false,
              emitError: false,
              eslintPath: 'D:\\GitRepo\\vue-ant-demo\\node_modules\\eslint',
              formatter: function () { /* omitted long function */ }
            }
          }
        ]
      },
      /* config.module.rule('i18n') */
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        use: [
          /* config.module.rule('i18n').use('i18n') */
          {
            loader: '@kazupon/vue-i18n-loader'
          }
        ]
      },
      /* config.module.rule('snapsvg') */
      {
        test: 'D:\\GitRepo\\vue-ant-demo\\snapsvg\\dist\\snap.svg.js',
        use: [
          /* config.module.rule('snapsvg').use('imports-loader?this=>window,fix=>module.exports=0') */
          {
            loader: 'imports-loader'
          }
        ]
      },
      /* config.module.rule('icons') */
      {
        test: /\.svg$/,
        include: [
          'D:\\GitRepo\\vue-ant-demo\\src\\icons'
        ],
        use: [
          /* config.module.rule('icons').use('svg-sprite-loader') */
          {
            loader: 'svg-sprite-loader',
            options: {
              symbolId: 'icon-[name]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\\/]node_modules[\\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('terser') */
      new TerserPlugin(
        {
          terserOptions: {
            compress: {
              arrows: false,
              collapse_vars: false,
              comparisons: false,
              computed_props: false,
              hoist_funs: false,
              hoist_props: false,
              hoist_vars: false,
              inline: false,
              loops: false,
              negate_iife: false,
              properties: false,
              reduce_funcs: false,
              reduce_vars: false,
              switches: false,
              toplevel: false,
              typeofs: false,
              booleans: true,
              if_return: true,
              sequences: true,
              unused: true,
              conditionals: true,
              dead_code: true,
              evaluate: true
            },
            mangle: {
              safari10: true
            }
          },
          sourceMap: false,
          cache: true,
          parallel: true,
          extractComments: false
        }
      )
    ]
  },
  plugins: [
    /* config.plugin('vue-loader') */
    new VueLoaderPlugin(),
    /* config.plugin('define') */
    new DefinePlugin(
      {
        'process.env': {
          NODE_ENV: '"development"',
          VUE_APP_BASE_URL: '"/"',
          VUE_APP_CURRENT_MODE: '"mock"',
          VUE_APP_ENV: '"dev"',
          VUE_APP_FILE_SERVER_URL: '"http://127.0.0.1:8200"',
          VUE_APP_OAUTH_CLIENT_ID: '"springcloud"',
          VUE_APP_OAUTH_CLIENT_SECRET: '"springcloud"',
          VUE_APP_OAUTH_GRANT_TYPE: '"password"',
          VUE_APP_OAUTH_SCOPE: '"all"',
          VUE_APP_USER_SERVER_PROXY_URL: '"http://127.0.0.1:8100"',
          VUE_APP_USER_SERVER_URL: '"http://127.0.0.1:9000/user-center"',
          VUE_APP_VERSION: '"1.0.0"',
          BASE_URL: '"/"'
        }
      }
    ),
    /* config.plugin('case-sensitive-paths') */
    new CaseSensitivePathsPlugin(),
    /* config.plugin('friendly-errors') */
    new FriendlyErrorsWebpackPlugin(
      {
        additionalTransformers: [
          function () { /* omitted long function */ }
        ],
        additionalFormatters: [
          function () { /* omitted long function */ }
        ]
      }
    ),
    /* config.plugin('html') */
    new HtmlWebpackPlugin(
      {
        title: 'vue-ant-demo',
        templateParameters: function () { /* omitted long function */ },
        template: 'D:\\GitRepo\\vue-ant-demo\\public\\index.html'
      }
    ),
    /* config.plugin('preload') */
    new PreloadPlugin(
      {
        rel: 'preload',
        include: 'initial',
        fileBlacklist: [
          /\.map$/,
          /hot-update\.js$/
        ]
      }
    ),
    /* config.plugin('prefetch') */
    new PreloadPlugin(
      {
        rel: 'prefetch',
        include: 'asyncChunks'
      }
    ),
    /* config.plugin('copy') */
    new CopyPlugin(
      [
        {
          from: 'D:\\GitRepo\\vue-ant-demo\\public',
          to: 'D:\\GitRepo\\vue-ant-demo\\dist',
          toType: 'dir',
          ignore: [
            '.DS_Store',
            {
              glob: 'index.html',
              matchBase: false
            }
          ]
        }
      ]
    ),
    {}
  ],
  entry: {
    app: [
      './src/main.js'
    ]
  },
  devtool: 'inline-source-map'
}
