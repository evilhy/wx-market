import Http from './base'
const moduleName = 'news'

class News {
  /**
   * 首页滚动消息展示
   *
   * @returns
   * @memberof News
   */
  bulletInfo () {
    let http = new Http()
    http.path = `/${moduleName}/bulletInfo`
    return http.get()
  }
  /**
   * 每类消息未读个数
   *
   * @returns
   * @memberof News
   */
  statisticInfo () {
    let http = new Http()
    http.path = `/${moduleName}/statisticInfo`
    return http.get()
  }
  /**
   * 
   * @param {Number} page 当前页数
   * @param {Number} newsType 消息类型 5:资讯 6:资金状态 7:审核动态 8:活动通知
   * @returns
   * @memberof News
   */
  list (page, newsType) {
    let http = new Http()
    http.path = `/${moduleName}`
    http.headers = { 'page-num': page, limit: 20 }
    http.body = { newsType: Number(newsType) }
    http.loading = false
    return http.post()
  }
  /**
   * 
   * @param {Number} operateType 操作类型 0:已读 1：删除
   * @param {String} newsId 消息id 没传该值，默认全部操作
   * @returns
   * @memberof News
   */
  operate (operateType, newsId = '') {
    let http = new Http()
    http.path = `/${moduleName}/operate`
    http.body = { operateType, newsId }
    return http.post()
  }
}

export default new News()