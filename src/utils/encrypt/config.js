import sysConfig from 'utils/constant'
import url from 'utils/url'
import { typeOf } from 'utils/assist'

const getConfigData = Symbol('getConfigData')

class EncryptConfig { 
  /**
   * 根据模块获取不同的配置数据
   *
   * @param {String} requestUrl http请求url
   * @param {String} key 配置key
   * @returns
   * @memberof EncryptConfig
   */
  [getConfigData] (requestUrl, key) {
    if (typeOf(requestUrl) !== 'string' || !url.isUrl(requestUrl)) throw new Error('请传入请求的url')
    if (!key || typeOf(key) !== 'string') throw new Error('请传入获取的key')

    for (let [sysKey, sysValue] of Object.entries(sysConfig)) {
      if (typeOf(sysValue) === 'object') {
        let env = process.env.NODE_ENV
        let baseUrl = sysValue[env]
        if (baseUrl && url.isUrl(baseUrl) && requestUrl.includes(baseUrl)) {
          let resultKey = sysKey + key
          if (sysConfig[resultKey] && typeOf(sysConfig[resultKey]) === 'object') {
            return sysConfig[resultKey][env] || false
          }
          return false
        }
      }
    }
    return false
  }
  /**
   * 获取公钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getPublicKey (requestUrl) {
    return this[getConfigData](requestUrl, 'PublicKey')
  }
  /**
   * 获取签名salt
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getSignSalt (requestUrl) {
    return this[getConfigData](requestUrl, 'SignSalt')
  }
  /**
   * 获取私钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getPrivateKey (requestUrl) {
    return this[getConfigData](requestUrl, 'PrivateKey')
  }
}

export default new EncryptConfig()