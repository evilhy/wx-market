export default class Utils {
  static isDevelopmentEnv() {
    return process.env.VUE_APP_ENV === 'development'
  }

  static enableAdapterMode(isRequestSever) {
    return this.isDevelopmentEnv() && !isRequestSever
  }
}

export function typeOf(obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Map]': 'map',
    '[object Set]': 'set'
  }
  return map[toString.call(obj)]
}
