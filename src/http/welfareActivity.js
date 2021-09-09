import sysConfig from 'utils/constant'
import Http from './base'

const moduleName = 'welfareActivity'

class WelfareActivity {
  /**
   * 获取活动列表
   *
   * @param {Number} page 当前页
   * @returns
   * @memberof WelfareActivity
   */
  activityList(page) {
    const http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.VUE_APP_ENV]
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
  activityDetail(activityId) {
    const http = new Http()
    http.baseURL = sysConfig.wisalesBaseUrl[process.env.VUE_APP_ENV]
    http.path = `/${moduleName}/detailByPayRoll`
    http.query = { activityId }
    return http.get()
  }
}

export default new WelfareActivity()
