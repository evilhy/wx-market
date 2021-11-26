import { typeOf } from 'utils/assist'
import storage from 'utils/storage'
/* import Utils from './Utils' */

const sizeof = require('object-sizeof')
const { name, description } = require('../../../../package.json')
export const logStorageKey = 'httpLog'
const maxSize = 200 * 1024
const sessionCount = 3

export const SUCCESS_TYPE = 0
export const ERROR_TYPE = 1

async function readErrorMessage(responseData, message) {
  let type = typeOf(responseData)
  if (type !== 'object' && type !== 'blob') {
    return message
  }

  if (type === 'object') {
    return responseData.error_msg || responseData.errorMsg
  }
  if (type === 'blob') {
    return new Promise(resolve => {
      let reader = new FileReader()
      reader.addEventListener('load', function(e) {
        resolve(JSON.parse(e.target.result).error_msg)
      })
      reader.readAsText(responseData, ['utf-8'])
    })
  }
  return ''
}

async function dealResponse(res, type) {
  if (type === SUCCESS_TYPE) {
    let { config, status, data } = res
    return { config, responseData: data, status }
  } 
    let { config, message, response = {} } = res
    let status = response.status || 0
    let responseData = response.data || undefined
    message = await readErrorMessage(responseData, message)
    return { config, responseData, status, message }
  
}

function transferLog({ config = {}, responseData, status = 0, message = '', endTime }) {
  let result = {}
  let { path, baseURL, url, method, headers, params, data, responseType, startTime } = config
  result.path = path
  result.baseURL = baseURL
  result.url = url
  result.method = method.toUpperCase()
  result.headers = headers
  result.query = params
  result.body = data
  result.status = status
  result.message = message
  result.startTime = startTime
  result.endTime = endTime
  result.duration = endTime - startTime
  result.userAgent = navigator.userAgent
  result.projectName = name
  result.projectDesc = description
  result.jsessionId = headers['jsession-id'] || ''
  if (typeOf(data) === 'formData') {
    result.body = 'FormData{}'
  }
  if (responseType === 'json') {
    result.responseData = responseData
  } else {
    result.responseData = `${responseType}数据。。。`
  }

  return result
}

export function saveLog (log, clear = false) {
  if (clear) {
    storage.removeSession(logStorageKey)
  }
  let logSession = storage.getSession(logStorageKey, [])
  if (logSession.length >= sessionCount) {
    logSession.shift()
  }
  logSession.push(log)
  storage.setSession(logStorageKey, logSession)
}

export async function sendLog (log) {
  // let logSession = storage.getSession(logStorageKey, [])
  storage.removeSession(logStorageKey)
}

export async function createLog(res, type = SUCCESS_TYPE) {
  const endTime = new Date().getTime()
  // 处理成功/失败的数据
  let data = await dealResponse(res, type)
  // 转换需要存储的log
  let log = transferLog({ ...data, endTime })
  if (type === SUCCESS_TYPE) {
    // 存储日志
    if (sizeof(log) <= maxSize) {
      saveLog(log)
    }
  } else {
    // 发送日志
    sendLog(log)
  }
}
