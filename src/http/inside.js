import Http from './base'
import helper from '../utils/helper'
const moduleName = 'inside'
class Inside {
    sendCode (phone = helper.getUserInfo('phone', ''), busiType = '0') {
        let http = new Http()
        http.path = `/${moduleName}/sendCode`
        http.body = { phone, busiType }
        return http.post()
    }
    receipt (wageDetailId, receiptsStatus, msg) {
        let http = new Http()
        http.path = `/${moduleName}/receipt`
        http.body = {
            wageDetailId,
            receiptsStatus,
            msg
        }
        return http.post()
    }
    bindWX (code) {
        let phone = helper.getUserInfo('phone', '')
        let idNumber = helper.getUserInfo('idNumber', '')
        let http = new Http()
        http.path = `/${moduleName}/bindWX`
        http.body = { code, phone, idNumber }
        return http.post()
    }
}
export default new Inside()