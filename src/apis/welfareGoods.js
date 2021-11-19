import sysConfig from 'utils/constant'
import Http from './base'

const moduleName = 'welfareGoods'

class WelfareGoods {
  /**
   * 获取商品列表
   *
   * @param {Number} page 当前页
   * @returns
   * @memberof WelfareGoods
   */
  goodsList(activityId, page) {
    const http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.VUE_APP_ENV]
    http.path = `/${moduleName}/list`
    http.headers = { 'page-num': page, limit: 20 }
    http.query = { activityId, pickFlag: true }
    http.loading = false
    return http.get()
  }

  /**
   * 商品详情
   *
   * @param {String} activityId 活动id
   * @param {String} goodsInfoId 商品id
   * @returns
   * @memberof WelfareGoods
   */
  goodsDetail(activityId, goodsInfoId) {
    const http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.VUE_APP_ENV]
    http.path = `/${moduleName}/detail`
    http.query = { activityId, goodsInfoId }
    return http.get()
  }
}

export default new WelfareGoods()