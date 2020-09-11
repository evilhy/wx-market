import Http from './base'
const moduleName = 'wallet'

class Wallet {
  /**
   * 查询钱包余额和银行卡张数
   *
   * @returns
   * @memberof Wallet
   */
  getBalance () {
    let http = new Http()
    http.path = `/${moduleName}/empCardAndBalance`
    http.loading = false
    return http.get()
  }
}

export default new Wallet()