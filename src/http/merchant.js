import Http from './base'
const moduleName = 'merchant'
class Merchant {
  /**
   * 根据accessToken获取jsessionId
   *
   * @param {String} accessToken
   * @returns
   * @memberof Merchant
   */
  callback (accessToken) {
      let http = new Http()
      http.path = `/${moduleName}/callback`
      http.query = { accessToken }
      return http.get()
  }
}
export default new Merchant()
