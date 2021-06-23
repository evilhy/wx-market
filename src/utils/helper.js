import storage from './storage'
import { typeOf } from './assist'
import sysConfig from './constant'
import TimeInstance from './time'
import { Toast } from 'vant'
Toast.allowMultiple()

let timer = null
const helper = {
  title(title = '') {
    window.document.title = title
  },
  getUserInfo(infoKey = '', defaultValue = '') {
    return storage.getSessionObj('payrollUserInfo', infoKey, defaultValue)
  },
  saveUserInfo(infoObj) {
    storage.updateSessionObj('payrollUserInfo', infoObj)
  },
  clearUserInfo() {
    storage.removeSession('payrollUserInfo')
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
      duration: duration, // 持续展示 toast
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
  saveReceiptStatus(wageDetailId, key = 'receiptStautus', value) {
    let bankWageList = storage.getSession('bankWageList', [])
    for (let item of bankWageList.values()) {
      if (item.wageDetailId === wageDetailId) {
        item[key] = value
        storage.setSession('bankWageList', bankWageList)
        return
      }
    }
  },
  saveTFinanceInfo(info) {
    storage.updateSessionObj('tFinanceInfo', info)
  },
  getTFinanceInfo(infoKey = '', defaultValue = '') {
    return storage.getSessionObj('tFinanceInfo', infoKey, defaultValue)
  },
  saveShareInfo(info) {
    storage.updateSessionObj('shareInfo', info)
  },
  getShareInfo(infoKey = '', defaultValue = '') {
    return storage.getSessionObj('shareInfo', infoKey, defaultValue)
  },
  saveBannerList(list = []) {
    let entId = this.getUserInfo('entId')
    storage.setSession(`${entId}-bannerList`, list)
  },
  getBannerList(defaultValue = []) {
    let entId = this.getUserInfo('entId')
    return storage.getSession(`${entId}-bannerList`, defaultValue)
  },
  clearBannerList() {
    storage.removeSession('bannerList')
  },
  clearShareInfo() {
    storage.removeSession('shareInfo')
  },
  clearSession(infoKey = '') {
    if (infoKey) {
      storage.removeSession(infoKey)
    } else {
      storage.clearSession()
    }
  },
  saveVirusUserInfo(infoObj) {
    storage.updateLocalObj('virusUserInfo', infoObj)
  },
  getVirusUserInfo(infoKey, defaultValue) {
    return storage.getLocalObj('virusUserInfo', infoKey, defaultValue)
  },
  getIsReadManager() {
    return storage.getLocal('isReadManager')
  },
  saveIsReadManager(value) {
    storage.setLocal('isReadManager', value)
  },
  getIsReadManagerCurrent() {
    return storage.getSession('isReadManagerCurrent')
  },
  saveIsReadManagerCurrent(value) {
    storage.setSession('isReadManagerCurrent', value)
  },
  getPasswordStr(password = []) {
    return password.join(',')
  },
  saveFreePassword(type) {
    // 保存输入登录密码的时间和类型
    storage.setSession('freePassword', {
      type,
      time: new Date().getTime()
    })
  },
  getFreePassword() {
    return storage.getSession('freePassword')
  },
  clearFreePassword(type) {
    let freePassword = this.getFreePassword()
    if (freePassword && freePassword.type === type) {
      storage.removeSession('freePassword')
    }
  },
  checkFreeLogin() {
    // 免密
    let freePassword = this.getFreePassword()
    let now = new Date().getTime()
    return !!(freePassword && TimeInstance.add(freePassword.time, 5, 'i') > now)
  },
  saveBalanceStatus(flag) {
    storage.setSession('balanceStatus', flag)
  },
  getBalanceStatus() {
    return storage.getSession('balanceStatus', false)
  },
  checkShowBalance() {
    // 是否展示银行卡余额
    return this.getBalanceStatus() && this.checkFreeLogin()
  },
  setTheme(themeId) {
    if (!themeId) {
      themeId = sysConfig.defaultTheme
    }
    let app = document.querySelector('#app')
    if (app) {
      app.className = themeId
      storage.setSession('theme', themeId)
    }
  },
  getTheme() {
    return storage.getSession('theme', sysConfig.defaultTheme)
  },
  getThemeColor() {
    return sysConfig.themeColor[this.getTheme()]
  },
  isHxBank() {
    /**
     * apppartner=>渠道:  FXGJ=>放薪管家 ZRL=>中人联 YDNSH=>尧都农商 SJZHRB=>汇融银行 NEWUP=>辽宁振兴银行 ZXGZT=>知心工资条 NJCB=>南京银行
     * liquidation=>清算渠道: （银行）HXB=>华夏银行  YDNSH=>尧都农商 CRCBBANK=>长沙农商 SJZHRB=>汇融银行 NEWUP=>辽宁振兴银行 NJCB=>南京银行 NINGXIA=>宁夏银行
     */

    let { apppartner, liquidation } = this.getUserInfo()
    let bankType = liquidation || apppartner
    return bankType === 'FXGJ' || bankType === 'HXB'
  },
  checkYearBillOpen() {
    return this.isHxBank() && sysConfig.yearBillOpen
  },
  saveNoticeInfo(type, entry) {
    storage.setSession('noticeInfo', { type, entry })
  },
  getNoticeInfo() {
    return storage.getSession('noticeInfo', {})
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
