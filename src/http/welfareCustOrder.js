import Http from './base'
import sysConfig from 'utils/constant'

const moduleName = 'welfareCustOrder'

class WelfareCustOrder {
  /**
   * 兑换虚拟商品
   *
   * @param {String} activityId 活动id
   * @param {String} goodsId 商品id
   * @returns
   * @memberof WelfareCustOrder
   */
  welfareExchange (activityId, goodsId) {
    let http = new Http()
    http.baseURL = sysConfig.wisales_base_url[process.env.NODE_ENV]
    http.path = `/${moduleName}/welfareExchange`
    http.body = { activityId, goodsId }
    return http.post()
  }
  /**
   * 兑换话费
   *
   * @param {String} activityId 活动id
   * @param {String} goodsId 商品id
   * @param {String} rechargePhone 手机号
   * @returns
   * @memberof WelfareCustOrder
   */
  welfareExchangePhone (activityId, goodsId, rechargePhone) {
    let http = new Http()
    http.baseURL = sysConfig.wisales_base_url[process.env.NODE_ENV]
    http.path = `/${moduleName}/welfareExchangePhone`
    http.body = { activityId, goodsId, rechargePhone }
    return http.post()
  }
  /**
   * 实物兑换
   *
   * @param {String} activityId 活动id
   * @param {String} goodsId 商品id
   * @param {String} addressId 地址id
   * @returns
   * @memberof WelfareCustOrder
   */
  welfareExchangeGoods (activityId, goodsId, addressId) {
    let http = new Http()
    http.baseURL = sysConfig.wisales_base_url[process.env.NODE_ENV]
    http.path = `/${moduleName}/welfareExchangeGoods`
    http.body = { activityId, goodsId, addressId }
    return http.post()
  }
}

export default new WelfareCustOrder()