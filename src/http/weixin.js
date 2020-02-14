import Http from './base'
const moduleName = 'weixin'
class Wechat {
  /**
   *
   * @description 根据code获取jessionId、idNumber和bindStatus
   * @param {String} code 微信code
   */
  wxCallback (code, appPartner) {
      let http = new Http()
      http.path = `/${moduleName}/wxCallback`
      http.query = { code, appPartner }
      return http.get()
  }
  /**
   * 获取微信分享需要的config数据
   */
  getJsapiSignature () {
    let url = window.encodeURIComponent(window.location.href.split('#')[0])
    let http = new Http()
    http.path = `/${moduleName}/getJsapiSignature`
    http.query = { url }
    return http.get()
  }
}
export default new Wechat()