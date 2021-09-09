import { isEmpty } from 'utils/assist'

const crypto = require('crypto')

const $algorithm = Symbol('$algorithm')
const kdf = Symbol('kdf')
const getKeyIV = Symbol('getKeyIV')

export default class Encryptor {
  constructor() {
    this[$algorithm] = ''
  }

  /**
   * 设置加密算法
   * @param {String} algorithm 算法
   */
  setAlgorithm(algorithm) {
    if (isEmpty(algorithm)) {
      throw new TypeError(`Algorithm cannot be set empty: ${algorithm}`)
    }
    this[$algorithm] = algorithm
  }

  /**
   * 加密
   * @param {String} payload 需要加密的文本
   * @param {String} password 秘钥
   * @param {String} salt 盐
   * @param {String} iterations 偏移量
   */
  encrypt(payload, password, salt, iterations) {
    const kiv = this[getKeyIV](password, salt, iterations)
    const cipher = crypto.createCipheriv('des', kiv[0], kiv[1])
    const encrypted = []
    encrypted.push(cipher.update(payload, 'utf-8', 'hex'))
    encrypted.push(cipher.final('hex'))

    const out = Buffer.from(encrypted.join(''), 'hex')

    const result = Buffer.alloc(out.length)
    out.copy(result, 0, 0, out.length)

    return result.toString('base64')
  }

  /**
   * 解密
   * @param {String} payload 需要解密的文本
   * @param {String} password 秘钥
   * @param {String} iterations 偏移量
   */
  decrypt(payload, password, salt, iterations) {
    const encryptedMessage = Buffer.from(payload, 'base64')

    const decrypted = []

    const kiv = this[getKeyIV](password, salt, iterations)
    const decipher = crypto.createDecipheriv('des', kiv[0], kiv[1])

    decrypted.push(decipher.update(encryptedMessage, 'hex', 'utf-8'))
    decrypted.push(decipher.final('utf-8'))

    return decrypted.join('')
  }

  /**
   * 设置偏移量
   * @param {String} password 秘钥
   * @param {String} salt 盐
   * @param {String} iterations 偏移量
   */
  [kdf](password, salt, iterations) {
    const pwd = Buffer.from(password, 'utf-8')
    let key = Buffer.concat([pwd, salt])
    for (let i = 0; i < iterations; i++) {
      key = crypto.createHash('md5').update(key).digest()
    }
    return key
  }

  /**
   * 获取秘钥和盐
   * @param {String} password 秘钥
   * @param {String} salt 盐
   * @param {String} iterations 偏移量
   */
  [getKeyIV](password, salt, iterations) {
    const key = this[kdf](password, salt, iterations)
    const keybuf = Buffer.from(key, 'binary').slice(0, 8)
    const ivbuf = Buffer.from(key, 'binary').slice(8, 16)
    return [keybuf, ivbuf]
  }
}
