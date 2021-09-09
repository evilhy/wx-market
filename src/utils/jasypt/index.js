import { isEmpty } from 'utils/assist'
import Jasyptor from './jasyptor'

export default class Jasypt {
  jasyptor = new Jasyptor()

  constructor(password, salt) {
    if (isEmpty(password)) throw new TypeError('Password cannot be set empty')
    if (isEmpty(salt)) throw new TypeError('salt cannot be set empty')

    this.jasyptor.setPassword(password)
    const buf = Buffer.allocUnsafe(8)
    buf.write(salt)
    this.jasyptor.setSalt(buf)
  }

  /**
   * 加密
   * @param {String} originalString
   */
  encrypt(originalString) {
    return this.jasyptor.encrypt(originalString)
  }

  /**
   * 解密
   * @param {String} encryptMsg
   */
  decrypt(encryptMsg) {
    return this.jasyptor.decrypt(encryptMsg)
  }
}
