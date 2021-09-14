import helper from 'utils/helper'
import Http from './base'

const moduleName = 'virus'

class Virus {
  /**
   * 获取微信用户信息
   *
   * @param {String} code
   * @returns
   * @memberof Wechat
   */
  userInfo(code) {
    const http = new Http()
    http.path = `/${moduleName}/userInfo`
    http.query = { code }
    return http.get()
  }

  /**
   * 获取弹幕列表
   *
   * @param {Number} page
   * @returns
   * @memberof Wechat
   */
  getBarrageList(page) {
    const openid = helper.getVirusUserInfo('openid', '')
    const http = new Http()
    http.path = `/${moduleName}`
    http.headers = { 'page-num': page, limit: 100 }
    http.query = { openid }
    http.loading = false
    return http.get()
  }

  /**
   * 提交用户抗病毒承诺
   */
  addPromise(data) {
    const http = new Http()
    http.path = `/${moduleName}`
    http.body = data
    http.loading = false
    return http.post()
  }
}
export default new Virus()
