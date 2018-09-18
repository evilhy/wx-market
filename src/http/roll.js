import Http from './base'
import helper from 'utils/helper'
const moduleName = 'roll'
class Roll {
    index () {
        let http = new Http()
        http.path = `/${moduleName}/index`
        return http.get()
    }
    entEmp (idNumber) {
        let http = new Http()
        http.path = `/${moduleName}/entEmp`
        http.query = { idNumber }
        return http.get()
    }
    empInfo () {
        let http = new Http()
        http.path = `/${moduleName}/empInfo`
        return http.get()
    }
    groupList () {
        let http = new Http()
        http.path = `/${moduleName}/groupList`
        return http.get()
    }
    wageList (groupId, year, type) {
        let http = new Http()
        http.path = `/${moduleName}/wageList`
        http.query = { groupId, year, type }
        return http.get()
    }
    wageDetail (wageSheetId) {
        let groupId = helper.getUserInfo('groupId', '')
        let http = new Http()
        http.path = `/${moduleName}/wageDetail`
        http.query = { wageSheetId, groupId }
        return http.get()
    }
    wageTrend (year, salaryType) {
        let groupId = helper.getUserInfo('groupId', '')
        let http = new Http()
        http.path = `/${moduleName}/wageTrend`
        http.query = { groupId, year, salaryType }
        return http.get()
    }
    invoice () {
        let http = new Http()
        http.path = `/${moduleName}/invoice`
        return http.get()
    }
}
export default new Roll()