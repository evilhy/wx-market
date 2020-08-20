import Http from './base'
const moduleName = 'wisales'

class Wisales {
  /**
   * 查询钱包余额和银行卡张数
   *
   * @returns
   * @memberof Wallet
   */
  getCardCount () {
    let http = new Http()
    http.path = `/${moduleName}/countWelfareEmpTicket`
    http.loading = false
    return http.post()
  }
}

export default new Wisales()