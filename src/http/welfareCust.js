import Http from './base'
import sysConfig from 'utils/constant'

const moduleName = 'welfareCust'

class WelfareCust {
  /**
   * 获取某个活动下的兑换记录
   *
   * @param {String} activityId 活动id
   * @param {Number} page 页数
   * @returns
   * @memberof WelfareCust
   */
  orderList (activityId, page) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/custOrderList`
    http.headers = { 'page-num': page, limit: 20 }
    http.query = { activityId }
    http.loading = false
    return http.get()
  }
  /**
   * 订单详情
   *
   * @param {String} transOrderId 订单id
   * @returns
   * @memberof WelfareCust
   */
  orderDetail (transOrderId) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/custOrderDetail`
    http.query = { transOrderId }
    return http.get()
  }
  /**
   * 获取收货地址列表
   *
   * @param {Number} page 页数
   * @returns
   * @memberof WelfareCust
   */
  addressList (page = 1) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/address/get`
    http.headers = { 'page-num': page, limit: 100 }
    return http.get()
  }
  /**
   * 获取详细的收货地址
   *
   * @param {String} addressId 地址id
   * @returns
   * @memberof WelfareCust
   */
  addressDetail (addressId) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/address/getById`
    http.query = { addressId }
    return http.get()
  }
  /**
   * 保存地址
   *
   * @param {Object} info 地址内容
   * @returns
   * @memberof Address
   */
  addressSave (info) { 
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/address/save`
    http.body = info
    return http.post()
  }
  /**
   * 删除地址
   *
   * @param {String} addressId 地址id
   * @returns
   * @memberof Address
   */
  addressDelete (addressId) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/address/delete`
    http.body = { addressId }
    return http.post()
  }
  /**
   * 查询省市区
   *
   * @param {String} areaType 类型 PROVINCE CITY  COUNTY
   * @param {String} code 上一级别的code
   * @returns
   * @memberof Address
   */
  baseQuery (areaType, code) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/area/baseQuery`
    http.query = { areaType, code }
    http.loading = false
    return http.get()
  }
  /**
   * 查询乡镇
   *
   * @param {String} code 区的code
   * @returns
   * @memberof Address
   */
  townQuery (code) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/area/townQuery`
    http.query = { code }
    http.loading = false
    return http.get()
  }
  /**
   * 物流详情
   *
   * @param {String} transOrderId 订单id
   * @returns
   * @memberof WelfareCust
   */
  orderTrack (transOrderId) {
    let http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.NODE_ENV]
    http.path = `/${moduleName}/orderTrack`
    http.query = { transOrderId }
    return http.get()
  }
}

export default new WelfareCust()