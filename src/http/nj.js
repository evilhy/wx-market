import Http from './base'
const moduleName = 'nj'
class Nj {
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
      http.loading = false
      return http.get()
  }
}
export default new Nj()