import wx from 'weixin-js-sdk'
import sysConfig from './constant'
export default class Wxapi {
  config ({ appId, timestamp, nonceStr, signature }) {
    return new Promise((resolve, reject) => {
      wx.config({
        debug: sysConfig.node_env === 'development', // 开启调试模式
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名，见附录1
        jsApiList: [
          'onMenuShareAppMessage',
          'onMenuShareTimeline'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(() => {
        resolve()
      })
      wx.error((res) => {
        reject(res)
      })
    })
  }
  shareTimeline(options = {}) {
    return new Promise((resolve, reject) => {
      let defaultOpts = {
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success() {
          resolve()
        },
        error(res) {
          reject(res)
        }
      }
      wx.onMenuShareTimeline({ ...defaultOpts, ...options })
    })
  }
  shareAppMessage(options = {}) {
    return new Promise((resolve, reject) => {
      let defaultOpts = {
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          resolve()
        },
        error(res) {
          reject(res)
        }
      }
      wx.onMenuShareAppMessage({ ...defaultOpts, ...options })
    })
  }
}
