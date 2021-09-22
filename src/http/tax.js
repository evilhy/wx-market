import Http from './base'

const moduleName = 'tax'

class Tax {
  /**
   * 获取签约记录页面地址
   * @param {签约id} taxSignId
   * @returns
   */
  signRecord(taxSignId) {
    const http = new Http()
    http.path = `/${moduleName}/signRecord`
    http.query = { taxSignId }
    return http.get()
  }

  /**
   * 签约详情
   * @returns
   */
  signingDetails(withdrawalLedgerId) {
    const http = new Http()
    http.path = `/${moduleName}/signingDetails`
    http.query = { withdrawalLedgerId }
    return http.get()
  }

  /**
   * 身份认证
   * @param {Object} body
   * @returns
   */
  attest(body) {
    const http = new Http()
    http.path = `/${moduleName}/attest`
    http.body = body
    return http.post()
  }

  /**
   * 签约
   * @param {String} taxSignId
   * @returns
   */
  signing(taxSignId, withdrawalLedgerId = '') {
    const http = new Http()
    http.path = `/${moduleName}/signing`
    http.body = { taxSignId, withdrawalLedgerId }
    return http.post()
  }
}

export default new Tax()
