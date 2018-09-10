import storage from './storage'
import router from '../router/index'
import { typeOf } from './assist'
import sysConfig from './constant'
import { Toast } from 'mint-ui'
let timer = null
const helper = {
  title (title) {
    title = title || 'demo'
    window.document.title = title
  },
  logout (routerName = 'login') {
    this.clearUserInfo()
    router.push({ name: routerName })
  },
  isLogin (toLogin) {
    if (!storage.getLocal('token', '')) {
      if (toLogin) {      // toLogin=true时，跳转登录
        router.push({ name: 'login' })
      }
      return false
    } else {
      return true
    }
  },
  getUserInfo (infoKey = '', defaultValue = '') {
    if (infoKey) {
      let userInfo = storage.getLocal('userInfo', {})
      return userInfo[infoKey] || defaultValue
    } else {
      return storage.getLocal('userInfo', defaultValue)
    }
  },
  saveUserInfo (infoObj) { // 保存或更新部分字段
    if (typeOf(infoObj) !== 'object') return false
    let userInfo = storage.getLocal('userInfo', {})
    storage.setLocal('userInfo', Object.assign(userInfo, infoObj))
  },
  clearUserInfo () {
    storage.removeLocal('userInfo')
  },
  getImgUrl (tailUrl = '', urlKey) {
    urlKey = Object.keys(sysConfig.img_base_url).includes(urlKey) ? urlKey : sysConfig.node_env
    return sysConfig.img_base_url[urlKey] + (typeOf(tailUrl) === 'string' ? tailUrl : '')
  },
  toast (msg, position = 'bottom', duration = 3000) {
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
  saveIdInfo (infoObj) { // 保存或更新部分字段
    if (typeOf(infoObj) !== 'object') return false
    let idInfo = storage.getSession('ID', {})
    storage.setSession('ID', Object.assign(idInfo, infoObj))
  },
  exit () {
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('closeWindow')
    }
  },
  pushBaiduEvent (event) {
    window._hmt.push(event)
  }
}
export default helper
