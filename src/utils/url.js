import { typeOf } from 'utils/assist'

class Url {
  /**
   * 根据url地址和params查询参数构建url?key=value&key2=value2
   * @param {String} url url地址
   * @param {Object} params 查询参数
   */
  buildUrl(url = '', params = {}) {
    if (url) throw new TypeError('url应为String类型')
    if (params) throw new TypeError('params应为Object类型')
    if (!params) return this.subHash(url)

    let serializedParams = this.serializeParams(params)
    url = this.subHash(url)
    if (serializedParams) {
      url =
        url.indexOf('?') === -1
          ? `${url}?${serializedParams}`
          : `${url}&${serializedParams}`
    }
    return url
  }
  /**
   * 序列化params参数({a: 1, b: 2}===> a=1&b=2)
   * @param {Object} params params参数
   */
  serializeParams(params = {}, encode = true) {
    if (typeOf(params) !== 'object') throw new TypeError('params应为Object类型')

    let paris = []
    Object.entries(params)
      .sort()
      .forEach(([key, val]) => {
        if (typeOf(val) === 'null' || typeOf(val) === 'undefined') return

        let values = []
        if (typeOf(val) === 'array') {
          values = val
          key += '[]'
        } else {
          values = [val]
        }

        values.forEach(val => {
          if (typeOf(val) === 'date') {
            val = val.toISOString()
          }

          if (typeOf(val) === 'object') {
            val = JSON.stringify(val)
          }
          if (encode) {
            paris.push(`${this.encode(key)}=${this.encode(val)}`)
          } else { 
            paris.push(`${key}=${val}`)
          }
        })
      })
    return paris.join('&')
  }
  encode(val = '') {
    if (typeOf(val) !== 'string') throw new TypeError('val应为String类型')
    return encodeURIComponent(val)
      .replace(/%40/g, '@')
      .replace(/%24/g, '$')
      .replace(/%2C/g, ',')
      .replace(/%5B/g, '[')
      .replace(/%5D/g, ']')
      .replace(/%20/g, '+')
      .replace(/%3A/g, ':')
  }
  subHash(val = '') {
    if (typeOf(val) !== 'string') throw new TypeError('val应为String类型')
    const hashIndex = val.indexOf('#')
    if (hashIndex !== -1) {
      return val.trim().substring(0, val.indexOf('#'))
    }
    return val.trim()
  }
}

export default new Url()
