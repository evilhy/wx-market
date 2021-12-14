module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:vue/essential', 'plugin:prettier/recommended'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }],
    'import/extensions': [
      'off',
      {
        js: 'never',
        vue: 'never'
      }
    ],
    'import/no-unresolved': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'prefer-destructuring': 'off',
    'no-underscore-dangle': 'off',
    'global-require': 'off',
    'prefer-rest-params': 'off',
    'prefer-const': 'off',
    'no-console': 'off',
    'import/no-dynamic-require': 'off',
    'no-debugger': 'off',
    'no-restricted-globals': 'off',
    'no-unused-expressions': 'off',
    'max-classes-per-file': 'off',
    'vue/no-use-v-if-with-v-for': 'off',
    'no-array-constructor': 'off',
    'func-names': 'off',
    'import/newline-after-import': 'off',
    'no-shadow': 'off',
    'no-new': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',
    'no-multi-assign': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'prettier/prettier': 'off',
    'valid-v-bind-sync': 'off',
    'no-extraneous-dependencies': 'off',
    'no-extraneous-dependencies': 'off',
    'vue/no-unused-components': 'off'
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js'
      }
    }
  }
}
