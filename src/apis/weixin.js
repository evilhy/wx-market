import Http from './base'

const moduleName = 'weixin'

class Wechat {
  /**
   * 获取微信分享需要的config数据
   */
  getJsapiSignatureById() {
    let url = window.encodeURIComponent(window.location.href.split('#')[0])
    let http = new Http()
    http.path = `/${moduleName}/getJsapiSignatureById`
    http.query = { url, id: 'ZXGZT' }
    return http.get()
  }
}
export default new Wechat()
