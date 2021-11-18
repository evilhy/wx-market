import Http from './base'

const moduleName = 'nx'
class Nx {
  /**
   * 根据accessToken获取jsessionId
   *
   * @param {String} accessToken 宁夏银行
   * @returns
   * @memberof Nx
   */
  callback(accessToken) {
    const http = new Http()
    http.path = `/${moduleName}/callback`
    http.query = { accessToken }
    return http.get()
  }
}
export default new Nx()
