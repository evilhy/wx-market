import storage from './storage'
import {typeOf} from './assist'
import sysConfig from './constant'
import {Toast} from 'vant'
Toast.allowMultiple()

let timer = null
const helper = {
  title(title = '') {
    window.document.title = title
  },
  getUserInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('userInfo', infoKey, defaultValue)
  },
  saveUserInfo (infoObj) {
    storage.updateSessionObj('userInfo', infoObj)
  },
  clearUserInfo() {
    storage.removeSession('userInfo')
  },
  getImgUrl(tailUrl = '', urlKey) {
    urlKey = Object.keys(sysConfig.img_base_url).includes(urlKey)
      ? urlKey
      : process.env.NODE_ENV
    return (
      sysConfig.img_base_url[urlKey] +
      (typeOf(tailUrl) === 'string' ? tailUrl : '')
    )
  },
  toast(msg, position = 'center', duration = 3000) {
    clearTimeout(timer)
    const toast = Toast({
      duration: duration,       // 持续展示 toast
      // loadingType: 'spinner',
      message: msg,
      position: position
    })
    let second = 1
    const timers = setInterval(() => {
      second--
      if (second) {
        toast.message = msg
      } else {
        clearInterval(timers)
        Toast.clear()
      }
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
    storage.updateSessionObj('tFinanceInfo', info)
  },
  getTFinanceInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('tFinanceInfo', infoKey, defaultValue)
  },
  saveShareInfo (info) {
    storage.updateSessionObj('shareInfo', info)
  },
  getShareInfo (infoKey = '', defaultValue = '') {
    return storage.getSessionObj('shareInfo', infoKey, defaultValue)
  },
  saveBannerList (list = []) {
    storage.setSession('bannerList', list)
  },
  getBannerList (defaultValue = []) {
    return storage.getSession('bannerList', defaultValue)
  },
  clearBannerList () {
    storage.removeSession('bannerList')
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
  saveVirusUserInfo (infoObj) {
    storage.updateLocalObj('virusUserInfo', infoObj)
  },
  getVirusUserInfo (infoKey, defaultValue) {
    return storage.getLocalObj('virusUserInfo', infoKey, defaultValue)
  },
  getIsReadManager () {
   return storage.getLocal('isReadManager')
  },
  saveIsReadManager (value) {
    storage.setLocal('isReadManager', value)
  },
  getIsReadManagerCurrent () {
    return storage.getSession('isReadManagerCurrent')
  },
  saveIsReadManagerCurrent (value) {
    storage.setSession('isReadManagerCurrent', value)
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
