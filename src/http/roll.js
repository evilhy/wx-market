import helper from 'utils/helper'
import Http from './base'

const moduleName = 'roll'
class Roll {
  /**
   * @description 首页
   */
  index() {
    const http = new Http()
    http.path = `/${moduleName}/index`
    return http.get()
  }

  /**
   * @description 根据身份证返回机构列表
   * @param {String} idNumber 身份证号
   */
  entEmp(idNumber) {
    const http = new Http()
    http.path = `/${moduleName}/entEmp`
    http.body = { idNumber }
    return http.post()
  }

  /**
   * @description 查询员工信息
   */
  empInfo() {
    const http = new Http()
    http.path = `/${moduleName}/empInfo`
    return http.get()
  }

  /**
   * @description 获取机构列表
   */
  groupList() {
    const http = new Http()
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
    const http = new Http()
    http.path = `/${moduleName}/wageList`
    http.query = { groupId, year, type }
    return http.get()
  }

  /**
   * @description 查看工资条详情
   * @param {String} wageSheetId 工资表id
   */
  wageDetail(wageSheetId) {
    const groupId = helper.getUserInfo('groupId', '')
    const http = new Http()
    http.path = `/${moduleName}/wageDetail`
    http.query = { wageSheetId, groupId }
    return http.get()
  }

  wageTrend(year, salaryType) {
    const groupId = helper.getUserInfo('groupId', '')
    const http = new Http()
    http.path = `/${moduleName}/wageTrend`
    http.query = { groupId, year, salaryType }
    return http.get()
  }

  /**
   * @description 查看发票信息
   */
  invoice() {
    const http = new Http()
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
  checkCard(cardNo) {
    const idNumber = helper.getUserInfo('idNumber', '')
    const http = new Http()
    http.path = `/${moduleName}/checkCard`
    http.body = { idNumber, cardNo }
    return http.post()
  }

  /**
   * 获取员工信息
   *
   * @memberof Roll
   */
  emp() {
    const http = new Http()
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
  checkPwd(pwd) {
    const http = new Http()
    http.path = `/${moduleName}/checkPwd`
    http.body = { pwd }
    return http.post()
  }

  /**
   * 获取员工所在企业列表
   *
   * @memberof Roll
   */
  empEnt() {
    const http = new Http()
    http.path = `/${moduleName}/empEnt`
    return http.get()
  }

  /**
   * 查询用户下的银行卡
   *
   * @returns
   * @memberof Roll
   */
  empCard() {
    const http = new Http()
    http.path = `/${moduleName}/empCard`
    return http.get()
  }

  /**
   * 查询银行卡修改记录
   *
   * @param {String}
   * @returns
   * @memberof Roll
   */
  empCardLog(ids = '') {
    const http = new Http()
    http.path = `/${moduleName}/empCardLog`
    http.query = { ids }
    return http.get()
  }

  /**
   * 获取手机号
   *
   * @returns
   * @memberof Roll
   */
  entPhone() {
    const http = new Http()
    http.path = `/${moduleName}/entPhone`
    return http.get()
  }

  /**
   * 获取企业管理员
   *
   * @returns
   * @memberof Roll
   */
  entUser(entId) {
    const http = new Http()
    http.path = `/${moduleName}/entUser`
    http.query = { entId }
    return http.get()
  }

  /**
   * 保存签名
   * @param {*} wageDetailId
   * @param {*} wageSheetId
   * @param {*} sign
   * @returns
   */
  saveSigned(wageSheetId, wageDetailId, sign) {
    const http = new Http()
    http.path = `/${moduleName}/saveSigned`
    http.body = { wageSheetId, wageDetailId, sign }
    // http.mockStatusCode = 400
    return http.post()
  }

  /**
   * 查询银行卡卡bin信息
   *
   * @param {String} cardNo  银行卡号
   * @returns
   * @memberof Inside
   */
  checkCardBin(cardNo) {
    const http = new Http()
    http.path = `/${moduleName}/checkCardBin/${cardNo}`
    return http.get()
  }
}
export default new Roll()
