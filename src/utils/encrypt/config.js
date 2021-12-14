import url from 'utils/url'
import { typeOf } from 'utils/assist'

const getConfigData = Symbol('getConfigData')

class EncryptConfig {
  /**
   * 根据模块获取不同的配置数据
   *
   * @param {String} requestUrl http请求url
   * @param {String} key 公钥还是签名盐值
   * @param {String} joinSymbol 连接符
   * @returns
   * @memberof EncryptConfig
   */
  [getConfigData](requestUrl, key, joinSymbol = '_') {
    if (typeOf(requestUrl) !== 'string' || !url.isUrl(requestUrl)) throw new Error('请传入请求的url')
    if (!key || typeOf(key) !== 'string') throw new Error('请传入获取的key')

    let config = process.env
    for (let [envKey, envValue] of Object.entries(config)) {
      if (url.isUrl(envValue) && requestUrl.includes(envValue)) {
        // 该baseURL对应在env中的公钥KEY或签名盐值KEY
        let resultKey = envKey + joinSymbol + key
        return config[resultKey] || ''
      }
    }
    return ''
  }

  /**
   * 获取公钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getPublicKey(requestUrl) {
    return this[getConfigData](requestUrl, 'PUBLIC_KEY')
  }

  /**
   * 获取签名salt
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getSignSalt(requestUrl) {
    return this[getConfigData](requestUrl, 'SIGN_SALT')
  }

  /**
   * 获取私钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof EncryptConfig
   */
  getPrivateKey(requestUrl) {
    return this[getConfigData](requestUrl, 'PRIVATE_KEY')
  }
}

export default new EncryptConfig()
