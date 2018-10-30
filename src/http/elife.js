import Http from './base'
import helper from 'utils/helper'
import sysConfig from 'utils/constant'
import crypto from 'utils/crypto'
const moduleName = 'elife'
class Elife {
  getUserInfo(code) {
    let http = new Http()
    http.path = `/${moduleName}`
    http.query = { code }
    http.loading = false
    return http.get()
  }
  joinActivity(name, phone) {
    let jsessionId = helper.getUserInfo('jsessionId', '')
    let http = new Http()
    http.path = `/${moduleName}`
    http.body = { name, phone, jsessionId }
    return http.post()
  }
  postElife({
    name = '',
    phone = '',
    managerName = '',
    mobile = '',
    branchOrgNo = '',
    branchOrgName = '',
    officer = ''
  }, loading) {
    let http = new Http()
    let appKey = 'testappkey'
    let timestamp = new Date().getTime().toString()
    let sign = crypto.MD5(appKey + timestamp.toString()).toUpperCase()
    http.baseURL = sysConfig.elife_base_url[sysConfig.node_env]
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
    http.loading = loading
    return http.post()
  }
}
export default new Elife()
