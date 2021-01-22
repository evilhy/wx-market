import Http from './base'
class Bill {
  /**
   * @description 年度账单
   */
  bill() {
    let http = new Http()
    http.path = '/bill'
    http.loading = false
    return http.get()
  }
}
export default new Bill()
