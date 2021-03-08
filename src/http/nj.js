import Http from './base'
import sysConfig from 'utils/constant'
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
      http.baseURL = sysConfig.njBaseUrl[process.env.NODE_ENV]
      http.path = `/${moduleName}/callback`
      http.query = { accessToken }
      http.loading = false
      return http.get()
  }
}
export default new Nj()