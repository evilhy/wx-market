import wx from 'weixin-js-sdk'
export default {
  created() {
    console.log('routerName:', this.$router.name)
  },
  methods: {
    wxShare () {
      this.wxConfig().then(() => {
        this.shareTimeline({
          title: this.tgInfo.product_title,
          link: window.location.href.replace('index', 'get-id'),
          imgUrl: this.tgInfo.content_cover
        }).then(() => {
          this.shareFlag = true
          this.shareMarkShow = false
        })
        this.shareAppMessage({
          title: this.tgInfo.product_title,
          desc: this.tgInfo.product_desc,
          link: window.location.href.replace('index', 'get-id'),
          imgUrl: this.tgInfo.content_cover
        }).then(() => {
          this.shareMarkShow = false
        })
      })
    },
    wxConfig () {
      let url = window.encodeURIComponent(window.location.href.split('#')[0])
      return new Promise((resolve, reject) => {
        this.$Http
          .connect(true, 'wxapi_base_url')
          .get(`/weixin/getJsapiSignature?url=${url}`)
          .then((response) => {
            wx.config({
              // debug: sysConfig.node_env === 'development', // 开启调试模式
              appId: response.appid,         // 必填，公众号的唯一标识
              timestamp: response.timestamp, // 必填，生成签名的时间戳
              nonceStr: response.noncestr,   // 必填，生成签名的随机串
              signature: response.signature, // 必填，签名，见附录1
              jsApiList: [
                  'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                  'onMenuShareTimeline'    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
              ]                            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(() => {
              resolve()
            })
            wx.error(() => {
              reject('wx.config出错')
            })
          })
          .catch(() => {
            reject('网络异常')
          })
      })
    },
    shareTimeline (options = {}) {
      return new Promise((resolve, reject) => {
        let defaultOpts = {
          title: '', // 分享标题
          link: '',  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success () {
            resolve()
          },
          error () {
            reject()
          }
        }
        wx.onMenuShareTimeline({ ...defaultOpts, ...options })
      })
    },
    shareAppMessage (options = {}) {
      return new Promise((resolve, reject) => {
        let defaultOpts = {
          title: '', // 分享标题
          desc: '', // 分享描述
          link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success () {
            resolve()
          },
          error () {
            reject()
          }
        }
        wx.onMenuShareAppMessage({ ...defaultOpts, ...options })
      })
    }
  }
}