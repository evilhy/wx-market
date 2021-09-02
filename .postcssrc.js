// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "postcss-import": {},
    "autoprefixer": {
      browsers: ['Android >= 5.0', 'iOS >= 8']
    },
    'postcss-px-to-viewport': {
      viewportWidth: 640,
      selectorBlackList: [],
      mediaQuery: true
    }
  }
}
