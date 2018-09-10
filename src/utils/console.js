import constant from './constant'
export default {
  log (...values) {
    constant.debug && console.log(...values)
  },
  warn (...values) {
    constant.debug && console.warn(...values)
  },
  error (...values) {
    constant.debug && console.error(...values)
  },
  debug (...values) {
    constant.debug && console.debug(...values)
  },
  clear (...values) {
    constant.debug && console.clear(...values)
  }
}
