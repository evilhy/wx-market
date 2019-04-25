import Http from './base'
class System {
  /**
   * @description 查询轮播图
   * @return Promise
   * */
  getBannerList () {
    let http = new Http()
    http.path = `/advertising/rotation`
    http.query = {channelId: 2}
    return http.get()
  }
}

export default new System()
