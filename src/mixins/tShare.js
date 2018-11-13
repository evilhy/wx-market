import Wxapi from 'utils/wxapi'
import helper from 'utils/helper'
const wxapiInstance = new Wxapi()
export default {
  data() {
    return {
    }
  },
  created () {
    
  },
  methods: {
    async shareConfig () {
      let res = await this.$Weixin.getJsapiSignature()
      let { appid, timestamp, noncestr, signature } = res.data
      let { productName = '', productDesc = '', productImg = '' } = helper.getTFinanceInfo(null, {})
      let link = this.getShareLink()
      await wxapiInstance.config({ appId: appid, timestamp, nonceStr: noncestr, signature })
      wxapiInstance.shareTimeline({
        title: productName,
        link,
        imgUrl: productImg
      })
      wxapiInstance.shareAppMessage({
        title: productName,
        desc: productDesc,
        link,
        imgUrl: productImg
      })
    },
    getShareLink () {
      let { query, path } = this.$route
      let fxId = helper.getShareInfo('fxId', '')
      let { entId = '', productId = '' } = helper.getTFinanceInfo(null, {})
      let tailUrl = Object.keys(query).length ? `&fxId=${fxId}` : `?fxId=${fxId}&entId=${entId}&productId=${productId}`
      return window.location.href.replace(`${path}`, `/tfinance-share`) + tailUrl
    }
  }
}
