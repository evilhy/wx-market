export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
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
    '[object Set]': 'set',
    '[object File]': 'file',
    '[object FormData]': 'formData'
  }
  return map[toString.call(obj)]
}

export function deepCopy(data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i += 1) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (const i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
export function isEmpty() {
  for (const obj of arguments) {
    if (obj === null || obj === undefined) {
      return true
    }
    if (typeOf(obj) === 'string' && obj.trim() === '') {
      return true
    }
  }
  return false
}
export function isEmojiCharacter(substring) {
  for (let i = 0; i < substring.length; i++) {
    const hs = substring.charCodeAt(i)
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1)
        const uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000
        if (uc >= 0x1d000 && uc <= 0x1f77f) {
          return true
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1)
      if (ls === 0x20e3) {
        return true
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        return true
      }
      if (hs >= 0x2b05 && hs <= 0x2b07) {
        return true
      }
      if (hs >= 0x2934 && hs <= 0x2935) {
        return true
      }
      if (hs >= 0x3297 && hs <= 0x3299) {
        return true
      }
      if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 || hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
        return true
      }
    }
  }
  return false
}
export function listenOrientation(vFn, hFn) {
  if (window.orientation === 90 || window.orientation === -90) {
    if (typeOf(hFn) === 'function') {
      hFn()
    }
  }
  window.addEventListener('orientationchange', () => {
    if (window.orientation === 90 || window.orientation === -90) {
      if (typeOf(hFn) === 'function') {
        hFn()
      }
    }
    if (window.orientation === 0 || window.orientation === 180) {
      if (typeOf(vFn) === 'function') {
        vFn()
      }
    }
  })
}

export function checkIsWeixin() {
  const useragent = navigator.userAgent.toLowerCase()
  return !!useragent.match(/micromessenger/i)
}

export function getPageQueryObject(fullPath = window.decodeURIComponent(window.location.href)) {
  if (typeOf(fullPath) !== 'string') return {}
  const result = {}
  fullPath
    .split('?')
    .filter((item) => item.includes('='))
    .map((item) => item.substring(0, item.includes('#') ? item.indexOf('#') : item.length))
    .join('&')
    .split('&')
    .forEach((item) => {
      const arr = item.split('=')
      if (arr[0]) {
        const [key, value] = arr
        result[`${key}`] = value
      }
    })
  return result
}

export function isAndroid() {
  const u = navigator.userAgent.toLowerCase()
  return /android/.test(u) || /linux/.test(u)
}

export function isIOS() {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

export function log(...rest) {
  if (process.env.VUE_APP_ENV !== 'production') {
    console.log(...rest)
  }
}

export function getHistoryYearList(startYear = new Date().getFullYear(), key) {
  const endYear = new Date().getFullYear()
  return new Array(endYear - startYear + 1).fill(0).map((year, index) => {
    const value = `${endYear - index}年`
    return key ? { [key]: value } : value
  })
}

export function getHistoryMonthList(year = new Date().getFullYear(), key) {
  const nowYear = new Date().getFullYear()
  const months = nowYear === parseInt(year, 10) ? new Date().getMonth() + 1 : 12
  const all = new Array(months).fill(0).map((month, index) => {
    const value = `${months - index}月`
    return key ? { [key]: value } : value
  })
  return [{ name: '全部' }].concat(all)
}

export function camelCase(str) {
  if (typeof str !== 'string' || !str) return str
  let reg = /[-_](\w)/g
  return str.replace(reg, ($0, $1) => {
    return $1.toUpperCase()
  })
}

export function upperFirst(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}
