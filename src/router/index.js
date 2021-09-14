import Vue from 'vue'
import VueRouter from 'vue-router'
import getId from '../views/public/getId'
import token from '../views/public/token'
import home from '../views/payroll/home' // 避免首页跳转过慢
import loginByPwd from '../views/pwd/loginByPwd'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/get-id', // 公共入口页面getId
    name: 'getId',
    component: getId,
    alias: '/'
  },
  {
    path: '/token', // 公共入口页面token
    name: 'token',
    component: token
  },
  {
    path: '/bind-id-card', // 身份绑定--输入身份证
    name: 'bindIdCard',
    component: () => import(/* webpackChunkName: "bindIdCard" */ '../views/public/bindIdCard.vue')
  },
  {
    path: '/choose-phone', // 身份绑定--选择手机号页面
    name: 'choosePhone',
    component: () => import(/* webpackChunkName: "choosePhone" */ '../views/public/choosePhone.vue')
  },
  {
    path: '/set-query-code', // 设置6位查询密码
    name: 'setQueryCode',
    component: () => import(/* webpackChunkName: "setQueryCode" */ '../views/pwd/setQueryCode.vue')
  },
  {
    path: '/complete', // 绑定|设置查询密码完成页面
    name: 'complete',
    component: () => import(/* webpackChunkName: "complete" */ '../views/public/complete.vue')
  },
  {
    path: '/bind-tel', // 身份绑定--绑定手机号
    name: 'bindTel',
    component: () => import(/* webpackChunkName: "bindTel" */ '../views/public/bindTel.vue')
  },
  {
    path: '/send-code', // 身份绑定--发送验证码
    name: 'sendCode',
    component: () => import(/* webpackChunkName: "sendCode" */ '../views/public/sendCode.vue')
  },
  {
    path: '/check-card-tail', // 身份绑定--验证银行卡后6位
    name: 'checkCardTail',
    meta: {
      title: '验证查询密码'
    },
    component: () => import(/* webpackChunkName: "checkCardTail" */ '../views/pwd/checkCardTail.vue')
  },
  {
    path: '/concat-ent-manager', // 联系企业管理员
    name: 'concatEntManager',
    component: () => import(/* webpackChunkName: "concatEntManager" */ '../views/user/concatEntManager.vue')
  },
  {
    path: '/home', // 首页
    name: 'home',
    component: home
  },
  {
    path: '/check-query-code/:name', // 验证查询密码
    name: 'checkQueryCode',
    meta: {
      title: '验证查询密码'
    },
    component: () => import(/* webpackChunkName: "checkQueryCode" */ '../views/pwd/checkQueryCode.vue')
  },
  {
    path: '/login-by-pwd', // 密码登录
    name: 'loginByPwd',
    component: loginByPwd
  },
  {
    path: '/forget-send-code', // 忘记查询密码--发送验证码
    name: 'forgetSendCode',
    meta: {
      title: '忘记查询密码'
    },
    component: () => import(/* webpackChunkName: "forgetSendCode" */ '../views/pwd/forgetSendCode.vue')
  },
  {
    path: '/set-new-query-code', // 设置新的查询密码
    name: 'setNewQueryCode',
    meta: {
      title: '设置查询密码'
    },
    component: () => import(/* webpackChunkName: "setNewQueryCode" */ '../views/pwd/setNewQueryCode.vue')
  },
  {
    path: '/wage-index/:wageSheetId', // 工资首页
    name: 'wageIndex',
    component: () => import(/* webpackChunkName: "wageIndex" */ '../views/payroll/wageIndex.vue')
  },
  {
    path: '/wage-detail/:wageSheetId', // 工资条详情页面
    name: 'wageDetail',
    component: () => import(/* webpackChunkName: "wageDetail" */ '../views/payroll/wageDetail.vue')
  },
  {
    path: '/wage-list', // 薪资列表页
    name: 'wageList',
    meta: {
      title: '我的收入'
    },
    component: () => import(/* webpackChunkName: "wageList" */ '../views/payroll/wageList.vue')
  },
  {
    path: '/ent-wage-list', // 薪资列表页（企业下拉）
    name: 'entWageList',
    meta: {
      title: '我的收入'
    },
    component: () => import(/* webpackChunkName: "entWageList" */ '../views/payroll/entWageList.vue')
  },
  {
    path: '/user', // 个人信息首页
    name: 'user',
    meta: {
      title: '个人信息'
    },
    component: () => import(/* webpackChunkName: "user" */ '../views/user/index.vue')
  },
  {
    path: '/user-ents', // 个人信息-任职企业
    name: 'userEnts',
    meta: {
      title: '任职企业'
    },
    component: () => import(/* webpackChunkName: "userEnts" */ '../views/user/ents.vue')
  },
  {
    path: '/user-theme', // 个人信息-主题更换
    name: 'userTheme',
    meta: {
      title: '主题更换'
    },
    component: () => import(/* webpackChunkName: "userTheme" */ '../views/user/theme.vue')
  },
  {
    path: '/pwd-manage', // 个人信息-密码安全
    name: 'pwdManage',
    meta: {
      title: '密码安全'
    },
    component: () => import(/* webpackChunkName: "pwdManage" */ '../views/pwd/pwdManage.vue')
  },
  {
    path: '/user-detail', // 个人信息详情
    name: 'userDetail',
    meta: {
      title: '员工信息'
    },
    component: () => import(/* webpackChunkName: "userDetail" */ '../views/user/detail.vue')
  },
  {
    path: '/set-handlock', // 个人信息-设置手势密码
    name: 'setHandLock',
    meta: {
      title: '设置手势密码'
    },
    component: () => import(/* webpackChunkName: "setHandLock" */ '../views/pwd/setHandLock.vue')
  },
  {
    path: '/check-handlock', // 个人信息-校验手势密码
    name: 'checkHandLock',
    meta: {
      title: '修改手势密码'
    },
    component: () => import(/* webpackChunkName: "checkHandLock" */ '../views/pwd/checkHandLock.vue')
  },
  {
    path: '/set-new-handlock', // 个人信息-设置新手势密码
    name: 'setNewHandLock',
    meta: {
      title: '修改手势密码'
    },
    component: () => import(/* webpackChunkName: "setNewHandLock" */ '../views/pwd/setNewHandLock.vue')
  },
  {
    path: '/bankcard-list', // 个人信息-银行卡列表
    name: 'bankcardList',
    meta: {
      title: '银行卡'
    },
    component: () => import(/* webpackChunkName: "bankcardList" */ '../views/user/bankcardList.vue')
  },
  {
    path: '/bankcard-edit', // 个人信息-银行卡修改
    name: 'bankcardEdit',
    meta: {
      title: '银行卡'
    },
    component: () => import(/* webpackChunkName: "bankcardEdit" */ '../views/user/bankcardEdit.vue')
  },
  {
    path: '/bankcard-history', // 个人信息-银行卡历史记录
    name: 'bankcardHistory',
    meta: {
      title: '修改记录'
    },
    component: () => import(/* webpackChunkName: "bankcardHistory" */ '../views/user/bankcardHistory.vue')
  },
  {
    path: '/select-modify-way', // 修改手机号-选择验证方式
    name: 'selectModifyWay',
    meta: {
      title: '修改手机号'
    },
    component: () => import(/* webpackChunkName: "selectModifyWay" */ '../views/user/selectModifyWay.vue')
  },
  {
    path: '/check-old-phone', // 修改手机号-旧手机号验证
    name: 'checkOldPhone',
    meta: {
      title: '修改手机号'
    },
    component: () => import(/* webpackChunkName: "checkOldPhone" */ '../views/user/checkOldPhone.vue')
  },
  {
    path: '/bind-new-phone', // 修改手机号-绑定新手机号
    name: 'bindNewPhone',
    meta: {
      title: '绑定新手机号'
    },
    component: () => import(/* webpackChunkName: "bindNewPhone" */ '../views/user/bindNewPhone.vue')
  },
  {
    path: '/check-ent-phone', // 修改手机号-企业中手机号验证
    name: 'checkEntPhone',
    meta: {
      title: '修改手机号'
    },
    component: () => import(/* webpackChunkName: "checkEntPhone" */ '../views/user/checkEntPhone.vue')
  },
  {
    path: '/confirm-modify-phone', // 修改手机号-确认绑定新手机号
    name: 'confirmModifyPhone',
    meta: {
      title: '绑定新手机号'
    },
    component: () => import(/* webpackChunkName: "confirmModifyPhone" */ '../views/user/confirmModifyPhone.vue')
  },
  {
    path: '/no-wage',
    name: 'noWage',
    component: () => import(/* webpackChunkName: "noWage" */ '../views/payroll/noWage.vue')
  },
  {
    path: '/invoice', // 发票信息页面
    name: 'invoice',
    meta: {
      title: '发票抬头信息'
    },
    component: () => import(/* webpackChunkName: "invoice" */ '../views/payroll/invoice.vue')
  },
  {
    path: '/question/:detailId', // 我有疑问页面
    name: 'question',
    meta: {
      title: '我有疑问'
    },
    component: () => import(/* webpackChunkName: "question" */ '../views/payroll/question.vue')
  },
  {
    path: '/manager', // 华夏管家页面
    name: 'manager',
    meta: {
      title: '华夏管家'
    },
    component: () => import(/* webpackChunkName: "manager" */ '../views/payroll/manager.vue')
  },
  {
    path: '/manager-detail',
    name: 'managerDetail',
    component: () => import(/* webpackChunkName: "managerDetail" */ '../views/payroll/managerDetail.vue')
  },
  {
    path: '/tax-instructions', // 个税说明
    name: 'taxInstructions',
    component: () => import(/* webpackChunkName: "taxInstructions" */ '../views/tax/taxInstructions.vue')
  },
  {
    path: '/tax-calculator', // 个税计算器
    name: 'taxCalculator',
    meta: {
      title: '个税计算器'
    },
    component: () => import(/* webpackChunkName: "taxCalculator" */ '../views/tax/taxCalculator.vue')
  },
  {
    path: '/wallet', // 钱包记录页
    name: 'wallet',
    component: () => import(/* webpackChunkName: "wallet" */ '../views/wallet/index.vue')
  },
  {
    path: '/balance-list', // 余额提现列表
    name: 'balanceList',
    meta: {
      title: '余额提现'
    },
    component: () => import(/* webpackChunkName: "balanceList" */ '../views/wallet/balanceList.vue')
  },
  {
    path: '/withdrawal-detail/:id', // 提现详情
    name: 'withdrawalDetail',
    meta: {
      title: '资金详情'
    },
    component: () => import(/* webpackChunkName: "withdrawalDetail" */ '../views/wallet/withdrawalDetail.vue')
  },
  {
    path: '/withdrawal-confirm/:id', // 提现确认
    name: 'withdrawalConfirm',
    meta: {
      title: '提现确认'
    },
    component: () => import(/* webpackChunkName: "withdrawalConfirm" */ '../views/wallet/withdrawalConfirm.vue')
  },
  {
    path: '/upload-identity/:withdrawalLedgerId', // 上传身份证
    name: 'uploadIdentity',
    meta: {
      title: '身份认证'
    },
    component: () => import(/* webpackChunkName: "uploadIdentity" */ '../views/wallet/uploadIdentity.vue')
  },
  {
    path: '/bank-site', // 银行网点页
    name: 'bankSite',
    component: () => import(/* webpackChunkName: "bankSite" */ '../views/public/bankSite.vue')
  },
  {
    path: '/ad-picture', // 银行网点页
    name: 'adPicture',
    component: () => import(/* webpackChunkName: "adPicture" */ '../views/public/adPicture.vue')
  },
  {
    path: '/about-us', // 关于我们
    name: 'aboutUs',
    component: () => import(/* webpackChunkName: "aboutUs" */ '../views/public/aboutUs.vue')
  },
  {
    path: '/wisale', // 唯销入口页面
    name: 'wisale',
    component: () => import(/* webpackChunkName: "wisale" */ '../views/wisale/enter.vue')
  },
  {
    path: '/welfare-list', // 福利货柜（券列表）
    name: 'welfareList',
    meta: {
      title: '员工福利'
    },
    component: () => import(/* webpackChunkName: "welfareList" */ '../views/welfare/welfareList.vue')
  },
  {
    path: '/welfare-detail/:activityId',
    name: 'welfareDetail',
    meta: {
      title: '员工福利'
    },
    component: () => import(/* webpackChunkName: "welfareDetail" */ '../views/welfare/welfareDetail.vue')
  },
  {
    path: '/welfare-goods-list/:activityId', // 福利货柜(礼品列表)
    name: 'welfareGoodsList',
    meta: {
      title: '礼品列表'
    },
    component: () => import(/* webpackChunkName: "welfareGoodsList" */ '../views/welfare/goodsList.vue')
  },
  {
    path: '/welfare-goods-detail/:activityId', // 福利货柜(礼品详情)
    name: 'welfareGoodsDetail',
    meta: {
      title: '礼品详情'
    },
    component: () => import(/* webpackChunkName: "welfareGoodsDetail" */ '../views/welfare/goodsDetail.vue')
  },
  {
    path: '/welfare-order-list/:activityId', // 福利货柜(订单记录)
    name: 'welfareOrderList',
    meta: {
      title: '兑换记录'
    },
    component: () => import(/* webpackChunkName: "welfareOrderList" */ '../views/welfare/orderList.vue')
  },
  {
    path: '/welfare-order-detail/:transOrderId', // 福利货柜(订单详情)
    name: 'welfareOrderDetail',
    meta: {
      title: '订单详情'
    },
    component: () => import(/* webpackChunkName: "welfareOrderDetail" */ '../views/welfare/orderDetail.vue')
  },
  {
    path: '/welfare-logistics-detail/:id', // 福利货柜(物流详情)
    name: 'welfareLogisticsDetail',
    meta: {
      title: '物流详情'
    },
    component: () => import(/* webpackChunkName: "welfareLogisticsDetail" */ '../views/welfare/logisticsDetail.vue')
  },
  {
    path: '/welfare-order-confirm/:activityId', // 福利货柜(确认实物订单)
    name: 'welfareOrderConfirm',
    meta: {
      title: '订单详情'
    },
    component: () => import(/* webpackChunkName: "welfareOrderConfirm" */ '../views/welfare/orderConfirm.vue')
  },
  {
    path: '/address-List', // 收货地址
    name: 'addressList',
    meta: {
      title: '收货地址'
    },
    component: () => import(/* webpackChunkName: "addressList" */ '../views/user/addressList.vue')
  },
  {
    path: '/add-new-address',
    name: 'addNewAddress',
    meta: {
      title: '新增收货地址'
    },
    component: () => import(/* webpackChunkName: "addNewAddress" */ '../views/user/addNewAddress.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import(/* webpackChunkName: "notice" */ '../views/notice/index.vue')
  },
  {
    path: '/hr-index', // 汇融银行-跳转
    name: 'hrIndex',
    component: () => import(/* webpackChunkName: "hrIndex" */ '../views/hr/index.vue')
  },
  {
    path: '/hr-ebank', // 汇融银行-电子银行
    name: 'hrEbank',
    meta: {
      title: '电子银行'
    },
    component: () => import(/* webpackChunkName: "hrEbank" */ '../views/hr/ebank.vue')
  },
  {
    path: '/2019-ncov', // 新型冠状病毒
    name: '2019Ncov',
    component: () => import(/* webpackChunkName: "2019Ncov" */ '../views/public/2019Ncov.vue')
  },
  {
    path: '/virus-auth', // 用户抗病毒授权页
    name: 'virusAuth',
    meta: {
      title: '武汉加油'
    },
    component: () => import(/* webpackChunkName: "virusAuth" */ '../views/virus/auth.vue')
  },
  {
    path: '/virus-code', // 用户抗病毒获取用户信息页
    name: 'virusCode',
    meta: {
      title: '武汉加油'
    },
    component: () => import(/* webpackChunkName: "virusCode" */ '../views/virus/code.vue')
  },
  {
    path: '/virus-promise', // 用户抗病毒承诺页
    name: 'virusPromise',
    meta: {
      title: '武汉加油'
    },
    component: () => import(/* webpackChunkName: "virusPromise" */ '../views/virus/promise.vue')
  },
  {
    path: '/zx-test', // 振兴银行测试
    name: 'zxTest',
    component: () => import(/* webpackChunkName: "zxTest" */ '../views/public/zxTest.vue')
  },
  {
    path: '/year-bill', // 年度账单
    name: 'yearBill',
    meta: {
      title: '放薪管家工资条年度账单'
    },
    component: () => import(/* webpackChunkName: "yearBill" */ '../views/yearBill/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
