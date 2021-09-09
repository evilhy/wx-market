import sysConfig from 'utils/constant'
import Http from './base'
import helper from '../utils/helper'

const moduleName = 'tfinance'
class Tfinance {
  /**
   * 获取产品活动列表
   */
  list() {
    const http = new Http()
    http.path = `/${moduleName}/list`
    return http.get()
  }

  /**
   * 获取产品信息
   * @param {String} productId
   * @param {String} entId
   */
  product({ productId, entId }) {
    const channel = helper.getShareInfo('channel', '0')
    const fxId = channel === '0' || channel === '1' ? '' : helper.getShareInfo('fxId', '')
    const http = new Http()
    http.path = `/${moduleName}/product`
    http.query = { productId, entId, channel, fxId }
    return http.get()
  }

  /**
   * 获取平台预约列表
   * @param {String} productId
   */
  intentionList(productId) {
    const http = new Http()
    http.path = `/${moduleName}/intentionList`
    http.query = { productId }
    return http.get()
  }

  /**
   * 获取操作列表
   * @param {Number} page
   * @param {Number} size
   * @param {String} productId
   * @param {String} entId
   */
  operateList(page = 1, operate) {
    const entId = helper.getTFinanceInfo('entId')
    const productId = helper.getTFinanceInfo('productId')
    const http = new Http()
    http.path = `/${moduleName}/operateList`
    http.headers = { 'page-num': page, limit: 20 }
    http.query = { productId, entId, operate }
    return http.get()
  }

  /**
   * 获取预约人的信息
   */
  userInfo() {
    const entId = helper.getTFinanceInfo('entId')
    const http = new Http()
    http.path = `/${moduleName}/userInfo`
    http.query = { entId }
    return http.get()
  }

  /**
   * 预约产品
   * @param {Object} data
   */
  intent(data) {
    const entId = helper.getTFinanceInfo('entId')
    const productId = helper.getTFinanceInfo('productId')
    const channel = helper.getShareInfo('channel', '0')
    const fxId = channel === '0' || channel === '1' ? '' : helper.getShareInfo('fxId', '')
    const http = new Http()
    http.path = `/${moduleName}/intent`
    http.body = { ...data, entId, productId, channel, fxId }
    return http.post()
  }

  /**
   * 预约信息
   */
  intentInfo() {
    const productId = helper.getTFinanceInfo('productId')
    const http = new Http()
    http.path = `/${moduleName}/intentInfo`
    http.query = { productId }
    return http.get()
  }

  /**
   * 获取跳转到tfinance-code页面的url
   */
  codeUrl() {
    const redirectUrl = `${sysConfig.proBaseUrl[process.env.VUE_APP_ENV]}tfinance-code`
    const http = new Http()
    http.path = `/${moduleName}/codeUrl`
    http.query = { redirectUrl }
    return http.get()
  }
}
export default new Tfinance()
