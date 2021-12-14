import Http from './base'

class Test {
  /**
   * 测试
   *
   * @returns
   * @memberof Test
   */
  getData() {
    let http = new Http()
    http.path = '/test'
    // http.encrypt = false
    return http.get()
  }
}
export default new Test()
