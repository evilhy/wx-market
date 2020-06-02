// import { Base64 } from 'js-base64'
import { typeOf } from 'utils/assist'
import Jasypt from 'utils/jasypt/index'

function dealObject (data, dealKeys) {
  let { passwd, salt } = data
  if (!passwd || !salt) return data
  let dObj = {}
  /* passwd = Base64.decode(passwd)
  salt = Base64.decode(salt) */
  let jasypt = new Jasypt(passwd, salt)
  dealKeys.forEach((key) => { 
    dObj[key] = jasypt.decrypt(data[key])
  })
  return Object.assign({}, data, dObj)
}

function dealArray (data, dealKeys) {
  if (!data.length) return data
  return data.map((item) => {
    return dealObject(item, dealKeys)
  })
}

export default function (data, ...dealKeys) {
  let dataType = typeOf(data)
  switch (dataType) { 
    case 'object':
      return dealObject(data, dealKeys)
    case 'array':
      return dealArray(data, dealKeys)
    default:
      return data
  }
}