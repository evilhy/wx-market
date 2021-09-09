import { Toast } from 'vant'
import storage from './storage'
import { typeOf } from './assist'
import sysConfig from './constant'
import TimeInstance from './time'

Toast.allowMultiple()

const timer = null
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
    urlKey = Object.keys(sysConfig.img_base_url).includes(urlKey) ? urlKey : process.env.VUE_APP_ENV
    return sysConfig.img_base_url[urlKey] + (typeOf(tailUrl) === 'string' ? tailUrl : '')
  },
  toast(msg, position = 'center', duration = 3000) {
    clearTimeout(timer)
    const toast = Toast({
      duration, // 持续展示 toast
      // loadingType: 'spinner',
      message: msg,
      position
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
  getDic(type) {
    return storage.getSession(`DIC_${type}`, [])
  },
  saveDic(type, data) {
    if (typeOf(data) !== 'array' || !data.length) return
    storage.setSession(`DIC_${type}`, data)
  },
  saveRemainTime() {
    const phone = helper.getUserInfo('phone', '')
    storage.setSession(`${phone}-remaintime`, new Date().getTime())
  },
  getRemainTime() {
    const phone = helper.getUserInfo('phone', '')
    return storage.getSession(`${phone}-remaintime`, new Date().getTime())
  },
  removeRemainTime() {
    const phone = helper.getUserInfo('phone', '')
    storage.removeSession(`${phone}-remaintime`)
  },
  saveReceiptStatus(wageDetailId, key = 'receiptStautus', value) {
    const bankWageList = storage.getSession('bankWageList', [])
    for (const item of bankWageList.values()) {
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
    const entId = this.getUserInfo('entId')
    storage.setSession(`${entId}-bannerList`, list)
  },
  getBannerList(defaultValue = []) {
    const entId = this.getUserInfo('entId')
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
    const freePassword = this.getFreePassword()
    if (freePassword && freePassword.type === type) {
      storage.removeSession('freePassword')
    }
  },
  checkFreeLogin() {
    // 免密
    const freePassword = this.getFreePassword()
    const now = new Date().getTime()
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
    document.documentElement.setAttribute('data-theme', themeId)
    storage.setSession('theme', themeId)
  },
  getTheme() {
    return storage.getSession('theme', sysConfig.defaultTheme)
  },
  getThemeColor() {
    return sysConfig.themeColor[this.getTheme()]
  },
  isHxBank() {
    /**
     *
     * apppartner=>渠道:  FXGJ=>放薪管家 YDNSH=>尧都农商 SJZHRB=>汇融银行 NEWUP=>辽宁振兴银行 ZXGZT=>知心工资条 NJCB=>南京银行
     * liquidation=>清算渠道: （银行）HXB=>华夏银行  YDNSH=>尧都农商 CRCBBANK=>长沙农商 SJZHRB=>汇融银行 NEWUP=>辽宁振兴银行 NJCB=>南京银行 NINGXIA=>宁夏银行
     */
    const { apppartner, liquidation } = this.getUserInfo()
    const bankType = liquidation || apppartner
    return bankType === 'FXGJ' || bankType === 'HXB'
  },
  isZRL() {
    const version = this.getUserInfo('version')
    return this.isHxBank && version === 'HR'
  },
  isHrBank() {
    const { apppartner, liquidation } = this.getUserInfo()
    return apppartner === 'SJZHRB' || liquidation === 'SJZHRB'
  },
  checkYearBillOpen() {
    return this.isHxBank() && sysConfig.yearBillOpen
  },
  saveNoticeInfo(type, entry) {
    storage.setSession('noticeInfo', { type, entry })
  },
  saveWithdrawDetail(data) {
    storage.setSession('withdrawDetail', data)
  },
  getWithdrawDetail() {
    return storage.getSession('withdrawDetail', {})
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
