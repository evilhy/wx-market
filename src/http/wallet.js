import Http from './base'
const moduleName = 'wallet'

class Wallet {
  /**
   * 查询钱包余额和银行卡张数
   *
   * @returns
   * @memberof Wallet
   */
  queryBalance () {
    let http = new Http()
    http.path = `/${moduleName}/empCardAdnBalance`
    return http.post()
  }
}

export default new Wallet()