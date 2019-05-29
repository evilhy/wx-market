module.exports = {
    plugins: {
      'autoprefixer': {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      'postcss-import': {
        rootValue: 32,
        propList: ['*']
      }
    }
  }