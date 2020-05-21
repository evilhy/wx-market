import Http from './base'
import helper from 'utils/helper'
const moduleName = 'roll'
class Roll {
  /**
   * @description 首页
   */
  index() {
    let http = new Http()
    http.path = `/${moduleName}/index`
    return http.get()
  }
  /**
   * @description 根据身份证返回机构列表
   * @param {String} idNumber 身份证号
   */
  entEmp(idNumber) {
    let http = new Http()
    http.path = `/${moduleName}/entEmp`
    http.body = { idNumber }
    return http.post()
  }
  /**
   * @description 查询员工信息
   */
  empInfo() {
    let http = new Http()
    http.path = `/${moduleName}/empInfo`
    return http.get()
  }
  /**
   * @description 获取机构列表
   */
  groupList() {
    let http = new Http()
    http.path = `/${moduleName}/groupList`
    return http.get()
  }
  /**
   * @description 获取工资列表
   *
   * @param {String} groupId 机构id
   * @param {Number} year 年份
   * @param {String} type 0: 资金到账 1：合计
   */
  wageList(groupId, year, type) {
    let http = new Http()
    http.path = `/${moduleName}/wageList`
    http.query = { groupId, year, type }
    return http.get()
  }
  /**
   * @description 查看工资条详情
   * @param {String} wageSheetId 工资表id
   */
  wageDetail(wageSheetId) {
    let groupId = helper.getUserInfo('groupId', '')
    let http = new Http()
    http.path = `/${moduleName}/wageDetail`
    http.query = { wageSheetId, groupId }
    return http.get()
  }
  wageTrend(year, salaryType) {
    let groupId = helper.getUserInfo('groupId', '')
    let http = new Http()
    http.path = `/${moduleName}/wageTrend`
    http.query = { groupId, year, salaryType }
    return http.get()
  }
  /**
   * @description 查看发票信息
   */
  invoice() {
    let http = new Http()
    http.path = `/${moduleName}/invoice`
    return http.get()
  }
  /**
   * 验证银行卡后6位
   *
   * @param {String} cardNo
   * @returns
   * @memberof Roll
   */
  checkCard (cardNo) {
    let idNumber = helper.getUserInfo('idNumber', '')
    let http = new Http()
    http.path = `/${moduleName}/checkCard`
    http.query = { idNumber, cardNo }
    return http.get()
  }
  /**
   * 获取员工信息
   *
   * @memberof Roll
   */
  emp () { 
    let http = new Http()
    http.path = `/${moduleName}/emp`
    return http.get()
  }
  /**
   * 验证6位查询密码
   *
   * @param {*} pwd
   * @returns
   * @memberof Roll
   */
  checkPwd (pwd) {
    let http = new Http()
    http.path = `/${moduleName}/checkPwd`
    http.query = { pwd }
    return http.get()
  }
  /**
   * 获取员工所在企业列表
   *
   * @memberof Roll
   */
  empEnt () {
    let http = new Http()
    http.path = `/${moduleName}/empEnt`
    return http.get()
  }
  /**
   * 查询用户下的银行卡
   *
   * @returns
   * @memberof Roll
   */
  empCard () { 
    let http = new Http()
    http.path = `/${moduleName}/empCard`
    return http.get()
  }
  /**
   * 查询银行卡修改记录
   *
   * @param {Array} [ids=[]]
   * @returns
   * @memberof Roll
   */
  empCardLog (ids = []) { 
    let http = new Http()
    http.path = `/${moduleName}/empCardLog`
    http.query = { ids: ids.join('|') }
    return http.get()
  }
  /**
   * 获取手机号
   *
   * @returns
   * @memberof Roll
   */
  entPhone () { 
    let http = new Http()
    http.path = `/${moduleName}/entPhone`
    return http.get()
  }
  /**
   * 获取企业管理员
   *
   * @returns
   * @memberof Roll
   */
  entUser (entId) {
    let http = new Http()
    http.path = `/${moduleName}/entUser`
    http.query = { entId }
    return http.get()
  }
}
export default new Roll()
