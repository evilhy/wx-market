
import Encryptor from './encryptor'
import { isEmpty, typeOf } from 'utils/assist'
const crypto = require('crypto')
const $encryptor = Symbol('$encryptor')
const $password = Symbol('$password')
const $salt = Symbol('$salt')
const $iterations = Symbol('$iterations')

export default class Jasyptor {
  constructor(opts = {}) {
    this[$encryptor] = new Encryptor()
    this[$encryptor].setAlgorithm('PBEWithMD5AndDES')
    this[$salt] = opts.salt || crypto.randomBytes(8)
    this[$iterations] = opts.iterations || 1000
    this[$password] = ''
  }

  /**
   * 设置秘钥
   * @param {String} password 秘钥
   */
  setPassword(password) {
    if (isEmpty(password)) throw new TypeError('Password cannot be set empty')
    this[$password] = password
  }

  setSalt(salt) {
    this[$salt] = salt
  }

  setIterations (iterations) {
    if (isEmpty(iterations)) throw new TypeError('Password cannot be set empty')
    this[$iterations] = iterations
  }
  /**
   * 加密
   * @param {String} message 需要加密的文本
   */
  encrypt(message) {
    if (isEmpty(message)) {
      return null
    }
    return this[$encryptor].encrypt(
      message,
      this[$password],
      this[$salt],
      this[$iterations]
    )
  }

  /**
   * 解密
   * @param {String} encryptedMessage 需要解密的文本
   */
  decrypt(encryptedMessage) {
    if (isEmpty(encryptedMessage)) {
      return null
    }
    return this[$encryptor].decrypt(
      encryptedMessage,
      this[$password],
      this[$salt],
      this[$iterations]
    )
  }

  /**
   * 解密对象里含有ENC(xxxx)格式的value
   * @param {Object} obj 入参配置对象
   */
  decryptConfig(obj) {
    if (typeOf(obj) !== 'object') {
      return
    }
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (typeOf(obj) === 'object') {
          this.decryptConfig(value)
        } else if (typeOf(obj) === 'string') {
          if (
            value.indexOf('ENC(') === 0 &&
            value.lastIndexOf(')') === value.length - 1
          ) {
            const encryptMsg = value.substring(4, value.length - 1)
            obj[key] = this.decrypt(encryptMsg)
          }
        } else if (typeOf(obj) === 'array') {
          for (const item of value) {
            if (typeOf(obj) === 'object') {
              this.decryptConfig(item)
            }
          }
        } else {
          continue
        }
      }
    }
  }
}
