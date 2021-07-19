import Http from './base'
const moduleName = 'wallet'

class Wallet {
  /**
   * 查询钱包余额和银行卡张数
   *
   * @returns
   * @memberof Wallet
   */
   getBalanceAndCard () {
    let http = new Http()
    http.path = `/${moduleName}/empCardAndBalance`
    return http.get()
  }
  /**
   * 查询钱包余额
   * @returns
   */
  getBalance () {
    let http = new Http()
    http.path = `/${moduleName}/balance`
    return http.get()
  }
  /**
   * 提现列表
   * @param {*} body
   * @param {*} page
   * @param {*} limit
   * @returns
   */
  withdrawalLedgerPage (body = {}, page, limit = 20) {
    let http = new Http()
    http.path = `/${moduleName}/withdrawalLedgerPage`
    http.headers = { 'page-num': page, limit }
    http.body = body
    http.loading = false
    return http.post()
  }
  /**
   * 提现详情
   * @param {String} withdrawalLedgerId
   * @returns
   */
  withdrawalLedgerDetail (withdrawalLedgerId) {
    let http = new Http()
    http.path = `/${moduleName}/withdrawalLedgerDetail/${withdrawalLedgerId}`
    return http.get()
  }
  /**
   * 提现进度
   * @param {String} withdrawalLedgerId
   * @returns
   */
   withdrawalRecordDetail (withdrawalLedgerId) {
    let http = new Http()
    http.path = `/${moduleName}/withdrawalRecordDetail/${withdrawalLedgerId}`
    return http.get()
  }
  /**
   * 确认提现
   * @param {*} body
   * @returns
   */
  withdraw (body = {}) {
    let http = new Http()
    http.path = `/${moduleName}/withdraw`
    http.body = body
    http.mockStatusCode = 500
    return http.post()
  }
}

export default new Wallet()
