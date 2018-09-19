import Http from './base'
import helper from '../utils/helper'
const moduleName = 'inside'
class Inside {
    /**
     * @description 发送验证码
     */
    sendCode (phone = helper.getUserInfo('phone', ''), busiType = '0') {
        let http = new Http()
        http.path = `/${moduleName}/sendCode`
        http.body = { phone, busiType }
        return http.post()
    }
    /**
     * @description 员工回执
     * @param {String} wageDetailId 工资id
     * @param {Number} receiptsStatus 0:确认无误 1：有返回信息
     * @param {String} msg 回执信息
     */
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
    /**
     * @description 微信号绑定身份证号
     * @param {String} code 验证码
     */
    bindWX (code) {
        let phone = helper.getUserInfo('phone', '')
        let idNumber = helper.getUserInfo('idNumber', '')
        let http = new Http()
        http.path = `/${moduleName}/bindWX`
        http.body = { code, phone, idNumber }
        return http.post()
    }
    /**
     * @description 已读工资条
     * @param {*} wageSheetId 工资表id
     */
    read (wageSheetId) {
        let http = new Http()
        http.path = `/${moduleName}/read`
        http.body = { wageSheetId }
        return http.post()
    }
}
export default new Inside()