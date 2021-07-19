export function trim(string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

export function typeOf(obj) {
  const toString = Object.prototype.toString
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
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}
export function isEmpty () {
  for (let obj of arguments) {
    if (obj === null || obj === undefined) {
      return true
    } else if (typeOf(obj) === 'string' && obj.trim() === '') {
      return true
    }
  }
  return false
}
export function isEmojiCharacter(substring) {
  for (let i = 0; i < substring.length; i++) {
    let hs = substring.charCodeAt(i)
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1)
        let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true
        }
      }
    } else if (substring.length > 1) {
      let ls = substring.charCodeAt(i + 1)
      if (ls === 0x20e3) {
        return true
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true
      } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
        hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
        return true
      }
    }
  }
}
export function listenOrientation (vFn, hFn) {
  if (window.orientation === 90 || window.orientation === -90) {
    typeOf(hFn) === 'function' && hFn()
  }
  window.addEventListener('orientationchange', () => {
    if (window.orientation === 90 || window.orientation === -90) {
      typeOf(hFn) === 'function' && hFn()
    }
    if (window.orientation === 0 || window.orientation === 180) {
      typeOf(vFn) === 'function' && vFn()
    }
  })
}

export function checkIsWeixin () {
  let useragent = navigator.userAgent.toLowerCase()
  return !!useragent.match(/micromessenger/i)
}

export function getPageQueryObject (fullPath = window.decodeURIComponent(window.location.href)) {
  if (typeOf(fullPath) !== 'string') return {}
  let result = {}
  fullPath.split('?')
    .filter(item => item.includes('='))
    .map(item => item.substring(0, item.includes('#') ? item.indexOf('#') : item.length))
    .join('&')
    .split('&')
    .forEach(item => {
      let arr = item.split('=')
      if (arr[0]) {
        result[`${arr[0]}`] = arr[1]
      }
    })
  return result
}

export function isAndroid () {
  let u = navigator.userAgent.toLowerCase()
  return /android/.test(u) || /linux/.test(u)
}

export function isIOS () {
  return /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
}

export function log (...rest) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...rest)
  }
}

export function getHistoryYearList (startYear = new Date().getFullYear(), key) {
  let endYear = new Date().getFullYear()
  return new Array(endYear - startYear + 1).fill(0).map((year, index) => {
    let value = (endYear - index) + '年'
    return key ? { [key]: value } : value
  })
}

export function getHistoryMonthList (year = new Date().getFullYear(), key) {
  let nowYear = new Date().getFullYear()
  let months = nowYear === parseInt(year) ? (new Date().getMonth() + 1) : 12
  let all = new Array(months).fill(0).map((month, index) => {
    let value = (months - index) + '月'
    return key ? { [key]: value } : value
  })
  return [{ name: '全部' }].concat(all)
}
