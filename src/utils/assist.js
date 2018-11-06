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

export function validIdCard(id) {
  if (typeOf(id) !== 'string' || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id)) {
    return false
  }
  return true
}
/* export function getPageQueryObject (fullPath = window.decodeURIComponent(window.location.href)) {
  let queryIndex = fullPath.indexOf('?')
  if (fullPath.indexOf('?') === -1) return {}
  let hashIndex = fullPath.indexOf('#')
  let str = fullPath
    .substring(fullPath.indexOf('?') + 1, queryIndex > hashIndex ? fullPath.length : hashIndex)
    .replace('/', '')
  let pairArr = str.split('&')
  let result = {}
  pairArr.forEach(item => {
    let indexOf = item.indexOf('=')
    if (indexOf !== -1) {
      result[item.substring(0, indexOf)] = item.substring(indexOf + 1)
    }
  })
  return result
} */
export function getPageQueryObject (fullPath = window.decodeURIComponent(window.location.href)) {
  if (typeOf(fullPath) !== 'string') return {}
  return fullPath.split('?')
    .filter(item => item.includes('='))
    .map(item => item.substring(0, item.includes('#') ? item.indexOf('#') : item.length))
    .join('&')
    .split('&')
    .map(item => {
      let arr = item.split('=')
      return {
        [`${arr[0]}`]: arr[1]
      }
    })
}