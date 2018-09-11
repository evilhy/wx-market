import Http from './base'
class Roll {
    entEmp (idNumber) {
        let http = new Http()
        http.path = '/roll/entEmp'
        http.query = { idNumber }
        return http.get()
    }
    bindWX (code) {
        let phone = helper.getUserInfo('phone', '')
        let idNumber = helper.getUserInfo('idNumber', '')
        let http = new Http()
        http.path = '/roll/bandWX'
        http.body = { code, phone, idNumber }
        return http.post()
    }
    isBind () {
        let http = new Http()
        http.path = '/roll/isBind'
        return http.get()
    }
}
export default new Roll()