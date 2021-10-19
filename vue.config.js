const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const packageConfig = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'

const cdn = {
  html: {
    css: [],
    js: [
      'https://unpkg.com/vue@2.6.14/dist/vue.min.js',
      'https://unpkg.com/vue-router@3.5.2/dist/vue-router.min.js',
      'https://unpkg.com/axios@0.21.4/dist/axios.min.js',
      'https://unpkg.com/vuex@3.6.2/dist/vuex.min.js'
    ]
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    axios: 'axios',
    vuex: 'Vuex'
  }
}

module.exports = {
  publicPath: './',
  outputDir: packageConfig.name,
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: { port: 9001 },
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `
          @import "~src/assets/scss/_var.scss";
          @import "~src/assets/scss/_mixins.scss";
        `
      }
    }
  },
  chainWebpack: (config) => {
    // 别名
    config.resolve.alias
      .set('src', resolve('src'))
      .set('core', resolve('src/core'))
      .set('http', resolve('src/http'))
      .set('assets', resolve('src/assets'))
      .set('mixins', resolve('src/mixins'))
      .set('components', resolve('src/components'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
    // 注入cdn
    if (isProduction) {
      config.plugin('html').tap((args) => {
        // 生产环境或本地需要cdn时，才注入cdn
        args[0].cdn = cdn.html
        return args
      })
      if (process.env.VUE_APP_ANALYZER === 'yes') {
        config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
          {
            analyzerMode: 'static'
          }
        ])
      }
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // gzip压缩
      const productionGzipExtensions = ['html', 'js', 'css']
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        })
      )
      // 公共代码抽离
      // cdn
      config.externals = cdn.externals
    }
  }
}
