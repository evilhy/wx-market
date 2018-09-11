import Http from 'src/http/index'
import CryptoJs from './crypto'
import vConsole from './console'
import Filter from './filter'
const install = function (Vue, opts) {
  Vue.prototype.Console = vConsole

  Object.entries(Http).forEach(([key, value]) => {
    Vue.prototype[`$${key}`] = value
  })
  Object.entries(CryptoJs).forEach(([key, value]) => {
    Vue.prototype[`$${key}`] = value
  })

  Object.entries(Filter).forEach(([key, value]) => {
    Vue.filter(key, value)
  })
}

export default { install: install }
