import helper from 'utils/helper'
import Http from './base'

const imgBanner6 = require('../assets/img/home-banner6.png')
const imgBanner3 = require('../assets/img/home-banner3.png')

const defaultBannerList = [
  {
    url: imgBanner6
  },
  {
    url: imgBanner3
  }
]
class System {
  /**
   * @description 查询轮播图
   * @return Promise
   * */
  async getBannerList() {
    const bannerStorage = helper.getBannerList()
    return new Promise((resolve, reject) => {
      if (bannerStorage.length) {
        resolve(bannerStorage)
      } else {
        const http = new Http()
        http.path = `/advertising/rotation`
        http.query = { channelId: 2 }
        http.get().then((res) => {
          const data = res.data.length ? res.data : defaultBannerList
          helper.saveBannerList(data)
          resolve(data)
        })
      }
    })
  }
}

export default new System()
