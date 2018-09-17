
export default {
  node_env: process.env.NODE_ENV,
  debug: process.env.NODE_ENV !== 'production',
  requested_sever: process.env.NODE_ENV !== 'development',
  http_base_url: {
    development: 'http://10.5.1.92:8080/rest',
    // test: 'https://sitwx.cardpu.com/easysp/',
    test: 'https://ae05dcc4.ngrok.io/rest',
    production: 'https://wxpwechat.cardpu.com/easysp/'
  },
  img_base_url: {
    mock: 'https://sitwx.cardpu.com/easysp/platform/showimg.json?resource_id=',
    development: 'https://sitwx.cardpu.com/easysp/platform/showimg.json?resource_id=',
    test: 'https://sitwx.cardpu.com/easysp/platform/showimg.json?resource_id=',
    production: 'https://wx.cardpu.com/easysp/platform/showimg.json?resource_id='
  },
  img_skin_url: {   // cdn加速
    mock: 'https://sitwx.cardpu.com/easysp/platform/showimg.json?resource_id=',
    development: 'https://sitwxp.cardpu.com/wechat/images/',
    test: 'https://sitwxp.cardpu.com/wechat/images/',
    production: 'https://wxp.cardpu.com/wechat/images/'
  },
  baidu_event: {  // 百度事件统计相关
    wageDetail: ['_trackEvent', '放薪工资条', '我的工资条'],
    mainMessage: ['_trackEvent', '放薪工资条', '个人信息'],
    wageList: ['_trackEvent', '查看工资', '选择机构'],
    choosePhone: ['_trackEvent', '身份验证', '选择手机号'],
    emptyPhone: ['_trackEvent', '身份验证', '空手机号'],
    hiddenBill: ['_trackEvent', '工资明细', '隐藏工资']
  },
  month_zh: {
    '01': '1月',
    '02': '2月',
    '03': '3月',
    '04': '4月',
    '05': '5月',
    '06': '6月',
    '07': '7月',
    '08': '8月',
    '09': '9月',
    '1': '1月',
    '2': '2月',
    '3': '3月',
    '4': '4月',
    '5': '5月',
    '6': '6月',
    '7': '7月',
    '8': '8月',
    '9': '9月',
    '10': '10月',
    '11': '11月',
    '12': '12月',
    '13': '3月',
    '14': '6月',
    '15': '9月',
    '16': '12月',
    '17': '6月',
    '18': '12月'
  }
}
