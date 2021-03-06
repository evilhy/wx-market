import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
import { typeOf } from 'utils/assist'
import url from 'utils/url'
import UUID from 'utils/uuid'
import timeUtil from 'utils/time'
import sha256 from './sha256'
import encryptConfig from './config'

const $signMethod = Symbol('$signMethod')
const $iv = Symbol('$iv')
const $padLen = Symbol('$padLen')

class Encrypt {
  // 签名算法
  [$signMethod] = 'sha256';

  // 向量
  [$iv] = CryptoJS.enc.Utf8.parse('1234567812345678');

  // 补全位数
  [$padLen] = 16

  /**
   * 1、Rsa 公钥  、Rsa 私钥
   * 2、随机生成16位字符串  aesKey
   * 3、客户端  使用   Rsa 公钥 对  aesKey 进行加密 生成  encodeKey
   * 4、传输 对象数据    json后，使用  aesKey 进行 加密  encryptBizData
   * 5、生成签名 sha256Sign_client （reqId、encodeKey、encryptBizData、signMethod、timestamp、signSalt）
   * @memberof Encrypt
   */
  httpEncrypt(data, method = '', requestUrl = '') {
    let aesKey = this.getRandomStr()
    let encodeKey = this.RSAEncrypt(aesKey, this.getPublicKey(requestUrl))
    let encryptBizData = method.toLowerCase() === 'post' ? this.AESEncrypt(this.dealOrginData(data), aesKey) : ''
    let timestamp = this.getTimeStr()
    let reqId = UUID.createUUID()
    let sha256Sign = this.getSha256Sign(reqId, encodeKey, encryptBizData, this[$signMethod], timestamp, this.getSignSalt(requestUrl))
    return {
      encodeKey,
      timestamp,
      reqId,
      sha256Sign,
      encryptBizData
    }
  }

  /**
   * 获取公钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof Encrypt
   */
  getPublicKey(requestUrl) {
    if (typeOf(requestUrl) !== 'string' || !url.isUrl(requestUrl)) throw new Error('请传入请求的url')

    return encryptConfig.getPublicKey(requestUrl)
  }

  /**
   * 获取私钥
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof Encrypt
   */
  getPrivateKey(requestUrl) {
    if (typeOf(requestUrl) !== 'string' || !url.isUrl(requestUrl)) throw new Error('请传入请求的url')

    return encryptConfig.getPrivateKey(requestUrl)
  }

  /**
   * 获取签名salt
   *
   * @param {String} requestUrl http请求url
   * @returns
   * @memberof Encrypt
   */
  getSignSalt(requestUrl) {
    if (typeOf(requestUrl) !== 'string' || !url.isUrl(requestUrl)) throw new Error('请传入请求的url')

    return encryptConfig.getSignSalt(requestUrl)
  }

  /**
   * 获取随机字符串
   *
   * @param {number} [len=this[$padLen]] 字符串长度
   * @returns
   * @memberof Encrypt
   */
  getRandomStr(len = this[$padLen]) {
    let randomStr = ''
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const maxLen = base.length
    for (let i = 0; i < len; i++) {
      randomStr += base.charAt(Math.floor(Math.random() * maxLen))
    }
    return randomStr
  }

  /**
   * 处理需要加密的原始数据
   * @param {Number} data
   */
  dealOrginData(data) {
    let type = typeOf(data)
    switch (type) {
      case 'object':
      case 'number':
      case 'array':
        return JSON.stringify(data)
      case 'string':
        return data
      default:
        return ''
    }
  }

  /**
   * RSA公钥加密
   *
   * @param {String} word 需要加密的数据
   * @param {String} publicKey 公钥
   * @memberof Encrypt
   */
  RSAEncrypt(word, publicKey) {
    if (typeOf(word) !== 'string') throw new TypeError('需要加密的数据应为String类型')
    if (typeOf(publicKey) !== 'string') throw new TypeError('publicKey应为String类型')

    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encrypt(word)
  }

  /**
   * RSA私钥解密
   *
   * @param {String} word 需要解密的数据
   * @param {String} privateKey 私钥
   * @returns
   * @memberof Encrypt
   */
  RSADecrypt(word, privateKey) {
    if (typeOf(word) !== 'string') throw new TypeError('需要解密的数据应为String类型')
    if (typeOf(privateKey) !== 'string') throw new TypeError('privateKey应为String类型')

    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decrypt(word)
  }

  /**
   * AES加密
   *
   * @param {String} word 需要加密的数据
   * @param {String} aesKey 密key
   * @memberof Encrypt
   */
  AESEncrypt(word, aesKey) {
    if (typeOf(word) !== 'string') throw new TypeError('需要加密的数据应为String类型')
    if (typeOf(aesKey) !== 'string' || aesKey.length !== this[$padLen]) throw new TypeError(`aesKey应为String类型且长度为${this[$padLen]}`)

    let aesKeyParse = CryptoJS.enc.Utf8.parse(aesKey)
    let parseLen = CryptoJS.enc.Utf8.parse(word).sigBytes
    let padLen = this[$padLen] - (parseLen % this[$padLen])
    word = word.padEnd(word.length + padLen)
    let encrypt = CryptoJS.AES.encrypt(word, aesKeyParse, { iv: this[$iv], mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding })
    return encrypt.toString()
  }

  /**
   * AES解密
   *
   * @param {String} word 需要解密的数据
   * @param {String} aesKey 密key
   * @returns
   * @memberof Encrypt
   */
  AESDecrypt(word, aesKey) {
    if (typeOf(word) !== 'string') throw new TypeError('需要解密的数据应为String类型')
    if (typeOf(aesKey) !== 'string') throw new TypeError('aesKey应为String类型')

    let aesKeyParse = CryptoJS.enc.Utf8.parse(aesKey)
    let decrypt = CryptoJS.AES.decrypt(word, aesKeyParse, { iv: this[$iv], mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding })
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
  }

  /**
   * 生成签名数据
   *
   * @param {*} aesKey
   * @param {*} encodeKey
   * @param {*} encryptBizData
   * @param {*} signMethod
   * @param {*} timestamp
   * @param {*} saltStr
   * @memberof Encrypt
   */
  getSha256Sign(reqId, encodeKey, bizData, signMethod, timestamp, salt) {
    return sha256(url.serializeParams({ reqId, encodeKey, bizData, signMethod, timestamp, salt }, false))
  }

  /**
   * 生成yyyyMMddHHmmss的时间字符串
   *
   * @returns
   * @memberof Encrypt
   */
  getTimeStr() {
    return timeUtil.format(new Date(), 'YmdHis')
  }

  /**
   * 将str用空格补全为len的整数倍
   *
   * @param {String} str
   * @param {number} [len=this[$padLen]]
   * @memberof Encrypt
   */
  padSpace(str, len = this[$padLen]) {
    if (typeOf(str) !== 'string') throw new TypeError('需要补全的数据应为String类型')
    if (typeOf(len) !== 'number') throw new TypeError('需要补全的长度应为Number类型')

    let padLen = len - (str.length % len)
    return str.padEnd(str.length + padLen)
  }
}

export default new Encrypt()
