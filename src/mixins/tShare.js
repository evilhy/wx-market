import Wxapi from 'utils/wxapi'
import sysConfig from 'utils/constant'
import helper from 'utils/helper'
const wxapiInstance = new Wxapi()
export default {
  data() {
    return {
      jsApiList: [
        'onMenuShareAppMessage',
        'onMenuShareTimeline'
      ]
    }
  },
  created() {
  },
  methods: {
    async share () {
      let res = await this.$Weixin.getJsapiSignature()
      let { appid, timestamp, noncestr, signature } = res.data
      let { entId = '', productId = '', productName = '', productDesc = '', productImg = '' } = helper.getTFinanceInfo(null, {})
      let fxId = helper.getShareInfo('fxId', '')
      let link = `${sysConfig.pro_base_url[sysConfig.node_env]}tfinance-share?entId=${entId}&productId=${productId}&fxId=${fxId}`
      await wxapiInstance.config({ appId: appid, timestamp, nonceStr: noncestr, signature, jsApiList: this.jsApiList })
      await wxapiInstance.shareTimeline({
        title: productName,
        link,
        imgUrl: productImg
      })
      await wxapiInstance.shareAppMessage({
        title: productName,
        desc: productDesc,
        link,
        imgUrl: productImg
      })
    }
  }
}
