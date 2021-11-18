import Http from './base'

const moduleName = 'wisales'

class Wisales {
  /**
   * 查询钱包余额和银行卡张数
   *
   * @returns
   * @memberof Wallet
   */
  getCardCount() {
    const http = new Http()
    http.path = `/${moduleName}/countWelfareEmpTicket`
    http.loading = false
    http.mockTimeout = 1
    return http.get()
  }
}

export default new Wisales()
