// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {
      overrideBrowserslist: ["Android 4.1", "iOS 8", "Chrome > 31", "ff > 31"],
    },
    "postcss-px-to-viewport": {
      viewportWidth: 640,
      selectorBlackList: [],
      mediaQuery: true,
      landscapeWidth: 1136,
    },
  },
};
