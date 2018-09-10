
export default {
  node_env: process.env.NODE_ENV,
  debug: process.env.NODE_ENV !== 'production',
  http_base_url: {
    mock: 'http://10.5.2.152:8018/mock/',
    development: 'https://sitwx.cardpu.com/easysp/',
    test: 'https://sitwx.cardpu.com/easysp/',
    production: 'https://wxpwechat.cardpu.com/easysp/'
  },
  main_key_url: 'pub010101.json',
  work_key_url: 'pub010102.json',
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
  http_headers: {
    'Content-type': 'application/json;charset=utf-8',
    'Accept': 'application/json, text/plain, */*'
  },
  http_timeout: 30000,
  http_fail_message: '网络异常，请重试！',
  http_over_message: '请求超时，请重试！',
  skin_type: 'newyear',
  error_info: {
  },
  account_money_type: [    // 华夏工资类型
    { label: '工资', value: '1', type: '0' },
    { label: '奖金', value: '2', type: '0' },
    { label: '过节费', value: '3', type: '0' },
    { label: '住房补贴', value: '4', type: '1' },
    { label: '交通补贴', value: '5', type: '1' },
    { label: '防暑降温费', value: '6', type: '1' },
    { label: '物业费', value: '7', type: '3' },
    { label: '取暖费', value: '8', type: '3' },
    { label: '报销款', value: '9', type: '1' },
    { label: '养老金', value: '10', type: '2' },
    { label: '社保金', value: '11', type: '2' },
    { label: '保险金', value: '12', type: '2' },
    { label: '公积金', value: '13', type: '2' },
    { label: '拆迁款', value: '14', type: '3' },
    { label: '加班费', value: '15', type: '0' },
    { label: '其他', value: '16', type: '3' },
    // 农信银工资类型
    { label: '工资', value: '0001', type: '0' },
    { label: '奖金', value: '0003', type: '0' },
    { label: '补助', value: '0004', type: '0' },
    { label: '补贴', value: '0005', type: '0' },
    { label: '医疗保险', value: '0006', type: '1' },
    { label: '养老保险', value: '0007', type: '1' },
    { label: '农业补贴', value: '0008', type: '3' },
    { label: '医疗补助', value: '0009', type: '3' },
    { label: '其他', value: '0002', type: '3' }
  ],
  invoiceInfoList: [
    {
      label: '公司名称',
      key: 'ent_name',
      type: '1'
    },
    {
      label: '税号',
      key: 'ent_tax_no',
      type: '1'
    },
    {
      label: '公司地址',
      key: 'ent_address',
      type: '2'
    },
    {
      label: '公司电话',
      key: 'ent_phone',
      type: '2'
    },
    {
      label: '开户银行',
      key: 'ent_open_bank_name',
      type: '2'
    },
    {
      label: '开户账号',
      key: 'ent_open_bank_account',
      type: '2'
    }
  ],
  service_status_info: {
    '0': '离职',
    '1': '在职',
    '2': '退休',
    '3': '停薪留职',
    '4': '兼职'
  },
  encode_words: [
    'total_amt',
    'sp_total_amt',
    'bank_total_amt',
    'plus_total_amt',
    'sub_total_amt',
    'item_amt',
    'aes_key',
    'hmd5_key'
  ],
  baidu_event: {  // 百度事件统计相关
    billDetail: ['_trackEvent', '放薪工资条', '我的工资条'],
    mainMessage: ['_trackEvent', '放薪工资条', '个人信息'],
    institution: ['_trackEvent', '查看工资', '选择机构'],
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
