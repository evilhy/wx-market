import Http from './base'
import helper from 'utils/helper'
class Roll {
    index () {
        let http = new Http()
        http.path = '/roll/index'
        return http.get()
    }
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
        http.path = '/roll/bindWX'
        http.body = { code, phone, idNumber }
        return http.post()
    }
    isBind () {
        let http = new Http()
        http.path = '/roll/isBind'
        return http.get()
    }
    empInfo () {
        let http = new Http()
        http.path = '/roll/empInfo'
        return http.get()
    }
    groupList () {
        let http = new Http()
        http.path = '/roll/groupList'
        return http.get()
    }
    wageList (groupId, year) {
        let http = new Http()
        http.path = '/roll/wageList'
        http.query = { groupId, year }
        return http.get()
    }
    wageDetail (planId) {
        let http = new Http()
        http.path = '/roll/wageDetail'
        http.query = { wageSheetId: planId }
        return http.get()
    }
    wageTrend (year, salaryType) {
        let groupId = helper.getUserInfo('groupId', '')
        let http = new Http()
        http.path = '/roll/wageTrend'
        http.query = { groupId, year, salaryType }
        return http.get()
    }
    invoice () {
        let http = new Http()
        http.path = '/roll/invoice'
        return http.get()
    }
    receipt (wageDetailId, receiptsStatus, msg) {
        let http = new Http()
        http.path = '/roll/receipt'
        http.body = {
            wageDetailId,
            receiptsStatus,
            msg
        }
        return http.post()
    }
}
export default new Roll()