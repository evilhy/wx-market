import Http from './base'
import sysConfig from 'utils/constant'
import helper from '../utils/helper'
const moduleName = 'tfinance'
class Tfinance {
  /**
   * 获取产品活动列表
   */
  list () {
    let http = new Http()
    http.path = `/${moduleName}/list`
    return http.get()
  }
  /**
   * 获取产品信息
   * @param {String} productId
   * @param {String} entId
   */
  product ({ productId, entId }) {
    let channel = helper.getShareInfo('channel', '0')
    let fxId = (channel === '0' || channel === '1') ? '' : helper.getShareInfo('fxId', '')
    let http = new Http()
    http.path = `/${moduleName}/product`
    http.query = { productId, entId, channel, fxId }
    return http.get()
  }
  /**
   * 获取平台预约列表
   * @param {String} productId
   */
  intentionList (productId) {
    let http = new Http()
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
  operateList (page = 1, operate) {
    let entId = helper.getTFinanceInfo('entId')
    let productId = helper.getTFinanceInfo('productId')
    let http = new Http()
    http.path = `/${moduleName}/operateList`
    http.headers = { page, size: 20 }
    http.query = { productId, entId, operate }
    return http.get()
  }
  /**
   * 获取预约人的信息
   */
  userInfo () {
    let entId = helper.getTFinanceInfo('entId')
    let http = new Http()
    http.path = `/${moduleName}/userInfo`
    http.query = { entId }
    return http.get()
  }
  /**
   * 预约产品
   * @param {Object} data 
   */
  intent (data) {
    let entId = helper.getTFinanceInfo('entId')
    let productId = helper.getTFinanceInfo('productId')
    let channel = helper.getShareInfo('channel', '0')
    let fxId = (channel === '0' || channel === '1') ? '' : helper.getShareInfo('fxId', '')
    let http = new Http()
    http.path = `/${moduleName}/intent`
    http.body = { ...data, entId, productId, channel, fxId }
    return http.post()
  }
  /**
   * 预约信息
   */
  intentInfo () {
    let productId = helper.getTFinanceInfo('productId')
    let http = new Http()
    http.path = `/${moduleName}/intentInfo`
    http.query = { productId }
    return http.get()
  }
  /**
   * 获取跳转到tfinance-code页面的url
   */
  codeUrl () {
    let redirectUrl = `${sysConfig.pro_base_url[sysConfig.node_env]}tfinance-code`
    let http = new Http()
    http.path = `/${moduleName}/codeUrl`
    http.query = { redirectUrl }
    return http.get()
  }
}
export default new Tfinance()
