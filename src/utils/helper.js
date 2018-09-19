import storage from './storage'
import router from '../router/index'
import { typeOf } from './assist'
import sysConfig from './constant'
import { Toast } from 'mint-ui'
let timer = null
const helper = {
  title(title) {
    title = title || '放薪管家'
    window.document.title = title
  },
  logout(routerName = 'login') {
    this.clearUserInfo()
    router.push({ name: routerName })
  },
  isLogin(toLogin) {
    if (!storage.getLocal('token', '')) {
      if (toLogin) {
        // toLogin=true时，跳转登录
        router.push({ name: 'login' })
      }
      return false
    } else {
      return true
    }
  },
  getUserInfo(infoKey = '', defaultValue = '') {
    if (infoKey) {
      let userInfo = storage.getSession('userInfo', {})
      return userInfo[infoKey] || defaultValue
    } else {
      return storage.getSession('userInfo', defaultValue)
    }
  },
  saveUserInfo(infoObj) {
    // 保存或更新部分字段
    if (typeOf(infoObj) !== 'object') return false
    let userInfo = storage.getSession('userInfo', {})
    storage.setSession('userInfo', Object.assign(userInfo, infoObj))
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
    }, 1500)
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
