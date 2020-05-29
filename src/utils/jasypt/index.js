import Jasyptor from './jasyptor'
import { isEmpty, typeOf } from 'utils/assist'

export default class Jasypt {

  jasyptor = new Jasyptor()

  constructor(password, salt) {
    if (isEmpty(password)) throw new TypeError('Password cannot be set empty')
    if (isEmpty(salt)) throw new TypeError('Password cannot be set empty')

    this.jasyptor.setPassword(password)
    let buf = Buffer.allocUnsafe(8)
    buf.write(salt)
    this.jasyptor.setSalt(buf)
  }
  /**
   * 加密
   * @param {String} originalString 
   */
  encrypt (originalString) {
    if (typeOf(originalString) !== 'string') {
      throw new TypeError('要加密的数据必须为String类型')
    }
    return this.jasyptor.encrypt(originalString)
  }
  /**
   * 解密
   * @param {String} encryptMsg 
   */
  decrypt (encryptMsg) {
    if (typeOf(encryptMsg) !== 'string') {
      throw new TypeError('要解密的数据必须为String类型')
    }
    return this.jasyptor.decrypt(encryptMsg)
  }
}
