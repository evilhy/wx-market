// eslint-disable-next-line
const path = require('path')
const packageConfig = require('./package.json')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: './',
  outputDir: packageConfig.name,
  runtimeCompiler: true,
  productionSourceMap: !IS_PROD,
  devServer: { port: 9001 },
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
  }
}
