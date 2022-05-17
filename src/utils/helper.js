import { Toast } from 'vant'
import validate from 'utils/validate'
import { typeOf } from './assist'
import storage from './storage'

export default {
  title(title) {
    window.document.title = title
  },
  logout(routerName = 'login') {
    this.clearUserInfo()
    if (validate.isUrl(routerName)) {
      window.location.replace(routerName)
    } else {
      window.router.replace({ name: routerName, query: {} })
    }
  },
  getUserInfo(infoKey = '', defaultValue = '') {
    return storage.getSessionObj('userInfo', infoKey, defaultValue)
  },
  saveUserInfo(infoObj) {
    storage.setSession('userInfo', infoObj)
  },
  updateUserInfo(infoObj) {
    storage.updateSessionObj('userInfo', infoObj)
  },
  clearUserInfo() {
    storage.removeSession('userInfo')
  },
  hasAuth(authKey) {
    if (typeOf(authKey) !== 'string') return false
    let authList = this.getUserInfo('permissions', [])
    return authList.includes(authKey)
  },
  toast(message, duration = 5000) {
    if (typeof message === 'string') {
      Toast({
        duration,
        message
      })
    }
    if (typeof message === 'object') {
      Toast(message)
    }
  },
  saveTheme(color = '') {
    if (color) {
      storage.setSession('theme', color)
      this.setTheme()
    }
  },
  setTheme() {
    let themeColor = this.getTheme()
    let style = document.createElement('style')
    style.innerHTML = `
      :root{
        --theme-color: ${themeColor};
      }
    `
    document.head.appendChild(style)
  },
  getTheme() {
    return storage.getSession('theme', '#F66246')
  }
}
