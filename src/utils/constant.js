export default {
  node_env: process.env.NODE_ENV,
  debug: process.env.NODE_ENV !== 'production',
  requested_sever: process.env.NODE_ENV !== 'development',
  http_base_url: {
    development: 'http://10.5.1.71:8080/rest',
    // development: 'https://sitwx.cardpu.com/rest',
    // test: 'https://sitwx.cardpu.com/rest',
    test: 'https://sitwx.cardpu.com/rest',
    production: 'https://fxpush.cardpu.com/rest'
  },
  elife_base_url: {
    development: 'https://demowisdom.wisales.cn:8213/easy-life',
    test: 'https://demowisdom.wisales.cn:8213/easy-life',
    production: 'https://easylife.wisales.cn:8211/easy-life'
  },
  pro_base_url: {
    development: 'https://sitwxp.cardpu.com/fx-payroll/#/',
    test: 'https://sitwxp.cardpu.com/fx-payroll/#/',
    production: 'https://wxp.cardpu.com/fx-payroll/#/'
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