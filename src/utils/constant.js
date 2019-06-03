export default {
  node_env: process.env.NODE_ENV,
  debug: process.env.NODE_ENV !== 'production',
  http_base_url: {
    development: 'http://10.5.1.71:8080',
    sit: 'https://sitwx.cardpu.com',
    demo: 'https://sitwx.cardpu.com',
    production: 'https://fxpush.cardpu.com'
  },
  elife_base_url: {
    development: 'https://demowisdom.wisales.cn:8213/easy-life',
    sit: 'https://demowisdom.wisales.cn:8213/easy-life',
    demo: 'https://demowisdom.wisales.cn:8213/easy-life',
    production: 'https://easylife.wisales.cn:8211/easy-life'
  },
  pro_base_url: {
    development: 'https://sitwxp.cardpu.com/fx-payroll/#/',
    sit: 'https://sitwxp.cardpu.com/fx-payroll/#/',
    demo: 'https://sitwxp.cardpu.com/fx-payroll/#/',
    production: 'https://wxp.cardpu.com/fx-payroll/#/'
  },
  bank_site_url: 'https://m.hxb.com.cn/pwxweb/NearbyQry.do?key=067dba74076478ab0786966a52980d7d9c67fefd3b5d255b4752a435f59fd9b40953d781b3b59c67cf9eeec21480fd326e003c6144c08d52945f131709ea4f31061ceb12201dff4b6492438d395bdb6e89ddfa2d9b4f64c6448d33775b8f2d2f00d5e102798312b5',
  about_us_url: 'https://mp.weixin.qq.com/s/X4mJZ1a55OkersW9yE0U0A',
  wisale_square_url: {
    development: 'https://sitwxp.cardpu.com/wisale-h5/#/',
    sit: 'https://sitwxp.cardpu.com/wisale-h5/#/',
    demo: 'https://sitwxp.cardpu.com/wisale-h5/#/',
    production: 'https://wxp.cardpu.com/wisale-h5/#/'
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
