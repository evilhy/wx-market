import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import CryptoJS from 'crypto-js'
import Http from './base'

const moduleName = 'elife'
class Elife {
  /**
   * 根据code获取用户信息(新闻乐荐)
   * @param {String} code 用户微信code
   */
  getUserInfo(code) {
    const http = new Http()
    http.path = `/${moduleName}`
    http.query = { code }
    return http.get()
  }

  /**
   * 参与喜闻乐荐活动
   * @param {String} name 参与者姓名
   * @param {*} phone 参与者手机号
   */
  joinActivity(name, phone) {
    const jsessionId = helper.getUserInfo('jsessionId', '')
    const http = new Http()
    http.path = `/${moduleName}`
    http.body = { name, phone, jsessionId }
    return http.post()
  }

  /**
   * 喜闻乐荐--智慧社区接口
   * @param {*} param0
   */
  postElife({ name = '', phone = '', managerName = '', mobile = '', branchOrgNo = '', branchOrgName = '', officer = '' }) {
    const http = new Http()
    const appKey = 'testappkey'
    const timestamp = new Date().getTime().toString()
    const sign = CryptoJS.MD5(appKey + timestamp.toString()).toUpperCase()
    http.baseURL = sysConfig.elifeBaseUrl[process.env.VUE_APP_ENV]
    http.path = '/plantform710001.json'
    http.body = {
      appKey,
      timestamp,
      sign,
      cust_name: name,
      cust_phone_uid: phone,
      cust_manager_name: managerName,
      cust_manager_phone_uid: mobile,
      deposit_code: officer,
      branch_id: branchOrgNo,
      branch_name: branchOrgName
    }
    return http.post()
  }

  /**
   * 根据code获取用户信息(薪有所属，畅想福利)
   * @param {String} code 用户微信code
   */
  xuser(code) {
    const http = new Http()
    http.path = `/${moduleName}/xuser`
    http.query = { code }
    return http.get()
  }

  /**
   * 参与薪有所属活动
   * @param {Object} param0
   */
  xjoin(idNumber = '', phone = '', code = '', codeId = '') {
    const jsessionId = helper.getUserInfo('jsessionId', '')
    const http = new Http()
    http.path = `/${moduleName}/xjoin`
    http.body = { idNumber, phone, code, codeId, jsessionId }
    return http.post()
  }

  /**
   * 心有所属--智慧社区接口
   * @param {*} param0
   */
  postElifeX({ name = '', phone = '', managerName = '', mobile = '', branchOrgNo = '', branchOrgName = '', officer = '' }) {
    const http = new Http()
    const appKey = 'testappkey'
    const timestamp = new Date().getTime().toString()
    const sign = CryptoJS.MD5(appKey + timestamp.toString()).toUpperCase()
    http.baseURL = sysConfig.elifeBaseUrl[process.env.VUE_APP_ENV]
    http.path = '/plantform710002.json'
    http.body = {
      appKey,
      timestamp,
      sign,
      cust_name: name,
      cust_phone_uid: phone,
      cust_manager_name: managerName,
      cust_manager_phone_uid: mobile,
      deposit_code: officer,
      branch_id: branchOrgNo,
      branch_name: branchOrgName
    }
    return http.post()
  }
}
export default new Elife()
