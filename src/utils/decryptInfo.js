import { Base64 } from 'js-base64'
import { typeOf } from 'utils/assist'
import Jasypt from 'utils/jasypt/index'

function dealObject(data, dealKeys) {
  let { passwd, salt } = data
  if (!passwd || !salt) return data
  const dObj = {}
  passwd = Base64.decode(passwd)
  salt = Base64.decode(salt)
  const jasypt = new Jasypt(passwd, salt)
  dealKeys.forEach((key) => {
    dObj[key] = jasypt.decrypt(data[key])
  })
  return { ...data, ...dObj }
}

function dealArray(data, dealKeys) {
  if (!data.length) return data
  return data.map((item) => {
    return dealObject(item, dealKeys)
  })
}
export function cryptInfo(data, passwd, salt) {
  // 模拟加密数据
  if (typeOf(data) !== 'string') throw new Error('需要加密的数据必须为String类型')

  passwd = Base64.decode(passwd)
  salt = Base64.decode(salt)
  const jasypt = new Jasypt(passwd, salt)
  return jasypt.encrypt(data)
}
export default function (data, ...dealKeys) {
  const dataType = typeOf(data)
  switch (dataType) {
    case 'object':
      return dealObject(data, dealKeys)
    case 'array':
      return dealArray(data, dealKeys)
    default:
      return data
  }
}
