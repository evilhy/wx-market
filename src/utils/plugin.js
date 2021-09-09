import dealFixedInput from 'mixins/dealFixedInput'
import { camelCase, upperFirst } from 'utils/assist'
import Filter from './filter'
import CryptoJs from './crypto'

const requireHttp = require.context('../http', false, /[^./base].*\.js$/)

const install = (Vue, opts) => {
  requireHttp.keys().forEach((fileName) => {
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

export default { install }
