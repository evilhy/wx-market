import CryptoJs from './crypto'
import vConsole from './console'
import Filter from './filter'
import dealFixedInput from 'mixins/dealFixedInput'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireHttp = require.context('../http', false, /[^./base].*\.js$/)

const install = function (Vue, opts) {
  Vue.prototype.Console = vConsole

  requireHttp.keys().forEach(fileName => {
    const name = upperFirst(
      camelCase(
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )
    Vue.prototype[`$${name}`] = requireHttp(fileName).default || requireHttp(fileName)
  })

  Object.entries(CryptoJs).forEach(([key, value]) => {
    Vue.prototype[`$${key}`] = value
  })

  Object.entries(Filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })
  
  Vue.directive('input', dealFixedInput)
}

export default { install: install }
