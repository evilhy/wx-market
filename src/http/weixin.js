import Http from './base'
const moduleName = 'weixin'
class Wechat {
    wxCallback (code) {
        let http = new Http()
        http.path = `/${moduleName}/wxCallback`
        http.query = { code }
        return http.get()
    }
}
export default new Wechat()