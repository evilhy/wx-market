
import CryptoJS from 'crypto-js'
import storage from './storage'
import { typeOf } from './assist'
import sysConfig from './constant'
let uuid = 'keys'
let iv = CryptoJS.enc.Utf8.parse('0000000000000000')

let encryptObj = {
  // crypto加密js库的加密方法   同步后台解密方法
  aesEncrypt (word, key) {
    let aeskey = CryptoJS.enc.Utf8.parse(key)
    // return CryptoJS.AES.encrypt(word, key).toString()
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypt = CryptoJS.AES.encrypt(srcs, aeskey, {iv: iv})
    return encrypt.ciphertext.toString().toUpperCase()
  },
  // crypto加密js库的解密方法   同步后台加密方法
  aesDecrypt (word, key) {
    let aeskey = CryptoJS.enc.Utf8.parse(key)
    // return CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8)
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
    let decrypt = CryptoJS.AES.decrypt(srcs, aeskey, {iv: iv})
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },
  // crypto加密js库的签名方法
  crypto_hmacMd5 (word, key) {
    return CryptoJS.HmacMD5(word, key).toString().toUpperCase()
  }
}
let encryption = {
  // 加密方法
  encrypt (data, aeskey) {
    function encryptRecurrence (data, aeskey) {
      for (var key in data) {
        if (typeOf(data[key]) === 'object' || typeOf(data[key]) === 'array') {
          encryptRecurrence(data[key], aeskey)
        } else {
          sysConfig.encode_words.forEach((value) => {
            if (data[key] && (value === key)) {
              data[key] = encryptObj.aesEncrypt(data[key], aeskey)
            }
          })
        }
      }
      return data
    }
    return encryptRecurrence(data, aeskey)
  },
  // 解密方法（只解密需要解密的字段）
  decrypt (data, aeskey) {
    function decryRecurrence (data, aeskey) {
      for (var key in data) {
        if (typeOf(data[key]) === 'object' || typeOf(data[key]) === 'array') {
          decryRecurrence(data[key], aeskey)
        } else {
          sysConfig.encode_words.forEach((v2) => {
            if (v2 === key) {
              data[key] = encryptObj.aesDecrypt(data[key], aeskey)
            }
          })
        }
      }
      return data
    }

    return decryRecurrence(data, aeskey)
  },
  // 签名方法（只签名需要签名的字段）
  hmacMd5 (data, hashkey, signArr) {
    let _encodeArr = []
    let _encodeStr = ''
    signArr.forEach((value) => {
      if (data[value]) {
        _encodeArr.push(data[value])
      }
    })
    // console.log("签名字段:",_encodeArr)
    if (_encodeArr.length === 0) {
      return encryptObj.crypto_hmacMd5('', hashkey)
    } else {
      _encodeStr = _encodeArr.join(' ').toUpperCase()
      return encryptObj.crypto_hmacMd5(_encodeStr, hashkey)
    }
  },
  // 设置加密localStorage
  // AES加密字符串,通过设备唯一识别码osnumber加密
  aesEnLocal (key, value) {
    storage.setLocal(key, CryptoJS.AES.encrypt(value, uuid).toString())
  },
  aesEnSession (key, value) {
    storage.setSession(key, CryptoJS.AES.encrypt(value, uuid).toString())
  },
  // 得到解密localStorage
  aesDeLocal (key) {
    if (storage.getLocal(key, '')) {
      return CryptoJS.AES.decrypt(storage.getLocal(key, ''), uuid).toString(CryptoJS.enc.Utf8)
    } else {
      return false
    }
  },
  aesDeSession (key) {
    if (storage.getSession(key, '')) {
      return CryptoJS.AES.decrypt(storage.getSession(key, ''), uuid).toString(CryptoJS.enc.Utf8)
    } else {
      return false
    }
  },
  // 设置加密localStorage对象
  aesEnLocalObj (key, value) {
    storage.setLocal(key, CryptoJS.AES.encrypt(JSON.stringify(value), uuid).toString())
  },
  // 得到解密localStorage对象
  aesDeLocalObj (key) {
    if (storage.getLocal(key, '')) {
      return JSON.parse(CryptoJS.AES.decrypt(storage.getLocal(key, ''), uuid).toString(CryptoJS.enc.Utf8))
    } else {
      return false
    }
  }
}
export default encryption
