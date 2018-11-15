import storage from './storage'
import { typeOf } from './assist'
import sysConfig from './constant'
import { Toast } from 'mint-ui'
const $getSessionObj = Symbol('$getSessionObj')
const $setSessionObj = Symbol('$setSessionObj')
const $updateSessionObj = Symbol('$updateSessionObj')
let timer = null
const helper = {
  title(title) {
    title = title || '放薪管家'
    window.document.title = title
  },
  [$getSessionObj] (storageKey = '', itemKey = '', defaultValue = '') {
    if (typeOf(storageKey) !== 'string') throw new TypeError('获取缓存对象的storageKey字段类型须为string')
    if (!storageKey) throw new Error('请指定获取缓存对象的storageKey')
    if (itemKey) {
      let storageObj = storage.getSession(storageKey, {})
      if (typeOf(storageObj[itemKey]) === 'undefined') {
        return defaultValue
      } else {
        return storageObj[itemKey]
      }
    } else { 
      return storage.getSession(storageKey, defaultValue)
    }
  },
  [$setSessionObj] (storageKey = '', infoObj = {}) {
    if (typeOf(storageKey) !== 'string') throw new TypeError('存储缓存对象的storageKey字段类型必须为string类型') 
    if (typeOf(infoObj) !== 'object') throw new TypeError('存储缓存对象的值必须为object类型')
    storage.setSession(storageKey, infoObj)
  },
  [$updateSessionObj] (storageKey = '', infoObj) {
    if (typeOf(storageKey) !== 'string') throw new TypeError('更新缓存对象的storageKey字段类型必须为string类型') 
    if (typeOf(infoObj) !== 'object') throw new TypeError('更新缓存对象的值必须为object类型')
    let storageObj = storage.getSession(storageKey, {})
    storage.setSession(storageKey, { ...storageObj, ...infoObj })
  },
  getUserInfo (infoKey = '', defaultValue = '') {
    return this[$getSessionObj]('userInfo', infoKey, defaultValue)
  },
  saveUserInfo (infoObj) {
    this[$updateSessionObj]('userInfo', infoObj)
  },
  clearUserInfo() {
    storage.removeSession('userInfo')
  },
  getImgUrl(tailUrl = '', urlKey) {
    urlKey = Object.keys(sysConfig.img_base_url).includes(urlKey)
      ? urlKey
      : sysConfig.node_env
    return (
      sysConfig.img_base_url[urlKey] +
      (typeOf(tailUrl) === 'string' ? tailUrl : '')
    )
  },
  toast(msg, position = 'bottom', duration = 3000) {
    clearTimeout(timer)
    let instance = Toast({
      message: msg,
      position: position,
      duration: duration
    })
    timer = setTimeout(() => {
      instance.close()
    }, duration)
  },
  saveRemainTime() {
    let phone = helper.getUserInfo('phone', '')
    storage.setSession(`${phone}-remaintime`, new Date().getTime())
  },
  getRemainTime() {
    let phone = helper.getUserInfo('phone', '')
    return storage.getSession(`${phone}-remaintime`, new Date().getTime())
  },
  removeRemainTime() {
    let phone = helper.getUserInfo('phone', '')
    storage.removeSession(`${phone}-remaintime`)
  },
  saveReceiptStatus(wageDetailId, status) {
    let bankWageList = storage.getSession('bankWageList', [])
    for (let item of bankWageList.values()) {
      if (item.wageDetailId === wageDetailId) {
        item.receiptStautus = status
        storage.setSession('bankWageList', bankWageList)
        return
      }
    }
  },
  saveTFinanceInfo (info) {
    this[$updateSessionObj]('tFinanceInfo', info)
  },
  getTFinanceInfo (infoKey = '', defaultValue = '') {
    return this[$getSessionObj]('tFinanceInfo', infoKey, defaultValue)
  },
  saveShareInfo (info) {
    this[$updateSessionObj]('shareInfo', info)
  },
  getShareInfo (infoKey = '', defaultValue = '') {
    return this[$getSessionObj]('shareInfo', infoKey, defaultValue)
  },
  clearShareInfo () {
    storage.removeSession('shareInfo')
  },
  clearSession (infoKey = '') {
    if (infoKey) {
      storage.removeSession(infoKey)
    } else {
      storage.clearSession()
    }
  },
  exit() {
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('closeWindow')
    }
  },
  pushBaiduEvent(event) {
    window._hmt.push(event)
  }
}
export default helper
