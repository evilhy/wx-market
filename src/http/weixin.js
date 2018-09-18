import Http from './base'
const moduleName = 'weixin'
class Wechat {
    /**
     *
     * @description 根据code获取jessionId、idNumber和bindStatus
     * @param {String} code 微信code
     */
    wxCallback (code) {
        let http = new Http()
        http.path = `/${moduleName}/wxCallback`
        http.query = { code }
        http.loading = false
        return http.get()
    }
}
export default new Wechat()