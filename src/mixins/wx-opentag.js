import Wxapi from 'utils/wxapi'
import helper from 'utils/helper'
const wxapi = new Wxapi()

export default {
  data() {
    return {
      isWeixin: wxapi.checkIsWeixin()
    }
  },
  created() {
    this.configWxapiOpenTag()
    document.addEventListener('WeixinOpenTagsError', function (e) {
      helper.toast(e.detail.errMsg) // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
    })
  },
  methods: {
    async configWxapiOpenTag() {
      const res = await this.$Weixin.getJsapiSignatureById()
      const { appid, timestamp, noncestr, signature } = res.data
      try {
        await wxapi.config({ appId: appid, timestamp, nonceStr: noncestr, signature })
        console.log('微信配置成功')
      } catch (e) {
        helper.toast('微信开放标签配置失败')
      }
    }
  }
}
