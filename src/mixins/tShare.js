import Wxapi from 'utils/wxapi'
import helper from 'utils/helper'
const wxapi = new Wxapi()

export default {
  data() {
    return {
    }
  },
  methods: {
    async wxCustomShare() {
      // if (!title || !desc || !imgUrl) { throw new Error('请设置微信分享的标题title、描述desc和图片imgUrl') }
      let { productName = '', productDesc = '', productImg = '' } = helper.getTFinanceInfo(null, {})
      let link = this.getShareLink()

      let res = await this.$Weixin.getJsapiSignature()
      let { appid, timestamp, noncestr, signature } = res.data
      await wxapi.config({
        appId: appid,
        timestamp,
        nonceStr: noncestr,
        signature
      })
      try {
        await wxapi.checkJsApi()
        wxapi.updateAppMessageShareData({ title: productName, desc: productDesc, link, imgUrl: productImg })
        wxapi.updateTimelineShareData({ title: productName, link, imgUrl: productImg })
      } catch (e) {
        helper.toast('请升级微信客户端后分享')
      }
      return res
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
