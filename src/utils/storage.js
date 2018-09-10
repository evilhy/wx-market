import { typeOf } from './assist'

let storage = {
  getLocal (key, defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '') {
      return defaultValue
    } else {
      if (typeOf(localStorage.getItem(key)) === 'null') {
        return defaultValue
      } else {
        return JSON.parse(localStorage.getItem(key))
      }
    }
  },
  setLocal (key, val) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(val) === 'undefined') return false
    if (['string', 'boolean', 'number', 'array', 'object'].includes(typeOf(val))) {
      localStorage.setItem(key, JSON.stringify(val))
    }
  },
  removeLocal (key) {
    if (typeOf(key) === 'undefined') return false
    if (typeOf(key) === 'string') {
      localStorage.removeItem(key)
    }
    if (typeOf(key) === 'array') {
      key.forEach((keyItem) => {
        if (typeOf(keyItem) === 'string') {
          localStorage.removeItem(keyItem)
        }
      })
    }
  },
  clearLocal () {
    localStorage.clear()
  },
  getSession (key, defaultValue = '') {
    if (typeOf(key) !== 'string' || key === '') {
      return defaultValue
    } else {
      if (typeOf(sessionStorage.getItem(key)) === 'null') {
        return defaultValue
      } else {
        return JSON.parse(sessionStorage.getItem(key))
      }
    }
  },
  setSession (key, val) {
    if (typeOf(key) !== 'string' || key === '' || typeOf(val) === 'undefined') return false
    if (['string', 'boolean', 'number', 'array', 'object'].includes(typeOf(val))) {
      sessionStorage.setItem(key, JSON.stringify(val))
    }
  },
  removeSession (key) {
    if (typeOf(key) === 'undefined') return false
    if (typeOf(key) === 'string') {
      sessionStorage.removeItem(key)
    }
    if (typeOf(key) === 'array') {
      key.forEach((keyItem) => {
        if (typeOf(keyItem) === 'string') {
          sessionStorage.removeItem(keyItem)
        }
      })
    }
  },
  clearSession () {
    sessionStorage.clear()
  }
}
export default storage
