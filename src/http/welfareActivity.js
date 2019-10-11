import Http from './base'
import sysConfig from 'utils/constant'

const moduleName = 'welfareActivity'

class WelfareActivity {
  /**
   * 获取活动列表
   *
   * @param {Number} page 当前页
   * @returns
   * @memberof WelfareActivity
   */
  activityList (page) {
    let http = new Http()
    http.baseURL = sysConfig.wisales_base_url[process.env.NODE_ENV]
    http.path = `/${moduleName}/listByPayRoll`
    http.headers = { 'page-num': page, limit: 20 }
    http.loading = false
    return http.get()
  }
  /**
   * 福利货柜活动详情
   *
   * @param {String} activityId 活动id
   * @returns
   * @memberof WelfareActivity
   */
  activityDetail (activityId) { 
    let http = new Http()
    http.baseURL = sysConfig.wisales_base_url[process.env.NODE_ENV]
    http.path = `/${moduleName}/detailByPayRoll`
    http.query = { activityId }
    return http.get()
  }
}

export default new WelfareActivity()