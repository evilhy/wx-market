import Http from './base'
import helper from 'utils/helper'
const defaultBannerList = [
  {
    url: require('../assets/img/home-banner6.png')
  },
  {
    url: require('../assets/img/home-banner3.png')
  }
]
class System {
  /**
   * @description 查询轮播图
   * @return Promise
   * */
  async getBannerList() {
    let bannerStorage = helper.getBannerList()
    return new Promise((resolve, reject) => {
      if (bannerStorage.length) {
        resolve(bannerStorage)
      } else {
        let http = new Http()
        http.path = `/advertising/rotation`
        http.query = { channelId: 2 }
        http.get().then(res => {
          let data = res.data.length ? res.data : defaultBannerList
          helper.saveBannerList(data)
          resolve(data)
        })
      }
    })
  }
}

export default new System()
