import Http from './base'
import helper from '../utils/helper'
import storage from '../utils/storage'

const moduleName = 'inside'
class Inside {
  /**
   * @description 发送验证码
   */
  sendCode(phone = helper.getUserInfo('phone', ''), busiType = '1', groupId = '') {
    const http = new Http()
    http.path = `/${moduleName}/sendCode`
    http.body = { phone, busiType, groupId }
    http.loading = false
    return http.post()
  }

  /**
   * @description 员工回执
   * @param {String} wageDetailId 工资id
   * @param {Number} receiptsStatus 0:确认无误 1：有返回信息
   * @param {String} msg 回执信息
   */
  receipt(wageDetailId, receiptsStatus, msg) {
    const http = new Http()
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
  bindWX(code) {
    const phone = helper.getUserInfo('phone', '')
    const idNumber = helper.getUserInfo('idNumber', '')
    const http = new Http()
    http.path = `/${moduleName}/bindWX`
    http.body = { code, phone, idNumber }
    return http.post()
  }

  /**
   * @description 已读工资条
   * @param {*} wageSheetId 工资表id
   */
  read(wageSheetId) {
    const http = new Http()
    http.path = `/${moduleName}/read`
    http.body = { wageSheetId }
    return http.post()
  }

  /**
   * 设置查询密码
   *
   * @param {String} code
   * @returns
   * @memberof Inside
   */
  setPwd(code) {
    const http = new Http()
    http.path = `/${moduleName}/setPwd`
    http.body = code
    return http.post()
  }

  /**
   * 绑定手机号
   *
   * @param {Object} data
   * @memberof Inside
   */
  bindTel(data) {
    const idNumber = helper.getUserInfo('idNumber', '')
    const http = new Http()
    http.path = `/${moduleName}/rz`
    http.body = { idNumber, ...data }
    return http.post()
  }

  /**
   * 更新银行卡
   *
   * @param {Object} data
   * @returns
   * @memberof Inside
   */
  updBankCard(data) {
    const http = new Http()
    http.path = `/${moduleName}/updBankCard`
    http.body = data
    return http.post()
  }

  /**
   * 验证手机验证码
   *
   * @param {Object} data
   * @returns
   * @memberof Inside
   */
  checkPhoneCode(data) {
    const http = new Http()
    http.path = `/${moduleName}/checkPhoneCode`
    http.body = data
    return http.post()
  }

  /**
   * 更换手机号
   *
   * @param {*} data
   * @returns
   * @memberof Inside
   */
  updPhone(data) {
    const http = new Http()
    http.path = `/${moduleName}/updPhone`
    http.body = data
    return http.post()
  }

  /**
   * 首页企业列表数
   *
   * @returns
   * @memberof Inside
   */
  empEntList() {
    const data = storage.getSession('entList', '')
    if (data) {
      return Promise.resolve({ data })
    }
    const http = new Http()
    http.path = `/${moduleName}/empEntList`
    return http.get().then((res) => {
      storage.setSession('entList', res.data)
      return res
    })
  }

  /**
   * 设置用户主题
   *
   * @param {*} themeId
   * @returns
   * @memberof Inside
   */
  theme(themeId) {
    const http = new Http()
    http.path = `/${moduleName}/theme`
    http.body = { themeId }
    return http.post()
  }
}
export default new Inside()
