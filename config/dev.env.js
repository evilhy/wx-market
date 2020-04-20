'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PUBLIC_KEY: '"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCNotSn72NFXy92LCc09MjZOAlhngjbUGrDcj8y8pTUMy1tM9NvTjWTMc9OU+bN9pnBzS7sFPJ+aSDaC81p6LeetHwovSkZGdxXMogFow3PPvnc+oc/19oeqsrMrB/bDxjF4sWVNgn+RhXjuOmBLn43WS10ZZ7zEV9DwT8WiyZVqQIDAQAB"',
  SIGN_SALT: '"zxyh7572"'
})
