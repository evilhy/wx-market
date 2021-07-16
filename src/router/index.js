import Vue from 'vue'
import Router from 'vue-router'
import getId from '../views/public/getId.vue'
import token from '../views/public/token.vue'
import home from '../views/payroll/home.vue' // 避免首页跳转过慢
import loginByPwd from '../views/pwd/loginByPwd.vue'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/get-id', // 公共入口页面getId
      name: 'getId',
      meta: {
        title: '放薪管家'
      },
      component: getId,
      alias: '/'
    },
    {
      path: '/token', // 公共入口页面token
      name: 'token',
      meta: {
        title: '放薪管家'
      },
      component: token
    },
    {
      path: '/bind-id-card', // 身份绑定--输入身份证
      name: 'bindIdCard',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/bindIdCard.vue'], resolve)
      }
    },
    {
      path: '/choose-phone', // 身份绑定--选择手机号页面
      name: 'choosePhone',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/choosePhone.vue'], resolve)
      }
    },
    {
      path: '/set-query-code', // 设置6位查询密码
      name: 'setQueryCode',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/pwd/setQueryCode.vue'], resolve)
      }
    },
    {
      path: '/complete', // 绑定|设置查询密码完成页面
      name: 'complete',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/complete.vue'], resolve)
      }
    },
    {
      path: '/bind-tel', // 身份绑定--绑定手机号
      name: 'bindTel',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/bindTel.vue'], resolve)
      }
    },
    {
      path: '/send-code', // 身份绑定--发送验证码
      name: 'sendCode',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/sendCode.vue'], resolve)
      }
    },
    {
      path: '/check-card-tail', // 身份绑定--验证银行卡后6位
      name: 'checkCardTail',
      meta: {
        title: '验证查询密码'
      },
      component: resolve => {
        require(['../views/pwd/checkCardTail.vue'], resolve)
      }
    },
    {
      path: '/concat-ent-manager', // 联系企业管理员
      name: 'concatEntManager',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/user/concatEntManager.vue'], resolve)
      }
    },
    {
      path: '/home', // 首页
      name: 'home',
      meta: {
        title: '放薪管家'
      },
      component: home
    },
    {
      path: '/check-query-code/:name', // 验证查询密码
      name: 'checkQueryCode',
      meta: {
        title: '验证查询密码'
      },
      component: resolve => {
        require(['../views/pwd/checkQueryCode.vue'], resolve)
      }
    },
    {
      path: '/login-by-pwd', // 密码登录
      name: 'loginByPwd',
      meta: {
        title: '放薪管家'
      },
      component: loginByPwd
    },
    {
      path: '/forget-send-code', // 忘记查询密码--发送验证码
      name: 'forgetSendCode',
      meta: {
        title: '忘记查询密码'
      },
      component: resolve => {
        require(['../views/pwd/forgetSendCode.vue'], resolve)
      }
    },
    {
      path: '/set-new-query-code', // 设置新的查询密码
      name: 'setNewQueryCode',
      meta: {
        title: '设置查询密码'
      },
      component: resolve => {
        require(['../views/pwd/setNewQueryCode.vue'], resolve)
      }
    },
    {
      path: '/wage-index/:wageSheetId', // 工资首页
      name: 'wageIndex',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageIndex.vue'], resolve)
      }
    },
    {
      path: '/wage-detail/:wageSheetId', // 工资条详情页面
      name: 'wageDetail',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageDetail.vue'], resolve)
      }
    },
    {
      path: '/wage-list', // 薪资列表页
      name: 'wageList',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageList.vue'], resolve)
      }
    },
    {
      path: '/ent-wage-list', // 薪资列表页（企业下拉）
      name: 'entWageList',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/entWageList.vue'], resolve)
      }
    },
    {
      path: '/user', // 个人信息首页
      name: 'user',
      meta: {
        title: '个人信息'
      },
      component: resolve => {
        require(['../views/user/index.vue'], resolve)
      }
    },
    {
      path: '/user-ents', // 个人信息-任职企业
      name: 'userEnts',
      meta: {
        title: '任职企业'
      },
      component: resolve => {
        require(['../views/user/ents.vue'], resolve)
      }
    },
    {
      path: '/user-theme', // 个人信息-主题更换
      name: 'userTheme',
      meta: {
        title: '主题更换'
      },
      component: resolve => {
        require(['../views/user/theme.vue'], resolve)
      }
    },
    {
      path: '/pwd-manage', // 个人信息-密码安全
      name: 'pwdManage',
      meta: {
        title: '密码安全'
      },
      component: resolve => {
        require(['../views/pwd/pwdManage.vue'], resolve)
      }
    },
    {
      path: '/user-detail', // 个人信息详情
      name: 'userDetail',
      meta: {
        title: '员工信息'
      },
      component: resolve => {
        require(['../views/user/detail.vue'], resolve)
      }
    },
    {
      path: '/set-handlock', // 个人信息-设置手势密码
      name: 'setHandLock',
      meta: {
        title: '设置手势密码'
      },
      component: resolve => {
        require(['../views/pwd/setHandLock.vue'], resolve)
      }
    },
    {
      path: '/check-handlock', // 个人信息-校验手势密码
      name: 'checkHandLock',
      meta: {
        title: '修改手势密码'
      },
      component: resolve => {
        require(['../views/pwd/checkHandLock.vue'], resolve)
      }
    },
    {
      path: '/set-new-handlock', // 个人信息-设置新手势密码
      name: 'setNewHandLock',
      meta: {
        title: '修改手势密码'
      },
      component: resolve => {
        require(['../views/pwd/setNewHandLock.vue'], resolve)
      }
    },
    {
      path: '/bankcard-list', // 个人信息-银行卡列表
      name: 'bankcardList',
      meta: {
        title: '银行卡'
      },
      component: resolve => {
        require(['../views/user/bankcardList1.vue'], resolve)
      }
    },
    {
      path: '/bankcard-list1', // 个人信息-银行卡列表
      name: 'bankcardList',
      meta: {
        title: '银行卡'
      },
      component: resolve => {
        require(['../views/user/bankcardList.vue'], resolve)
      }
    },
    {
      path: '/bankcard-edit', // 个人信息-银行卡修改
      name: 'bankcardEdit',
      meta: {
        title: '银行卡'
      },
      component: resolve => {
        require(['../views/user/bankcardEdit.vue'], resolve)
      }
    },
    {
      path: '/bankcard-history', // 个人信息-银行卡历史记录
      name: 'bankcardHistory',
      meta: {
        title: '修改记录'
      },
      component: resolve => {
        require(['../views/user/bankcardHistory.vue'], resolve)
      }
    },
    {
      path: '/select-modify-way', // 修改手机号-选择验证方式
      name: 'selectModifyWay',
      meta: {
        title: '修改手机号'
      },
      component: resolve => {
        require(['../views/user/selectModifyWay.vue'], resolve)
      }
    },
    {
      path: '/check-old-phone', // 修改手机号-旧手机号验证
      name: 'checkOldPhone',
      meta: {
        title: '修改手机号'
      },
      component: resolve => {
        require(['../views/user/checkOldPhone.vue'], resolve)
      }
    },
    {
      path: '/bind-new-phone', // 修改手机号-绑定新手机号
      name: 'bindNewPhone',
      meta: {
        title: '绑定新手机号'
      },
      component: resolve => {
        require(['../views/user/bindNewPhone.vue'], resolve)
      }
    },
    {
      path: '/check-ent-phone', // 修改手机号-企业中手机号验证
      name: 'checkEntPhone',
      meta: {
        title: '修改手机号'
      },
      component: resolve => {
        require(['../views/user/checkEntPhone.vue'], resolve)
      }
    },
    {
      path: '/confirm-modify-phone', // 修改手机号-确认绑定新手机号
      name: 'confirmModifyPhone',
      meta: {
        title: '绑定新手机号'
      },
      component: resolve => {
        require(['../views/user/confirmModifyPhone.vue'], resolve)
      }
    },
    {
      path: '/no-wage',
      name: 'noWage',
      component: resolve => {
        require(['../views/payroll/noWage.vue'], resolve)
      }
    },
    {
      path: '/invoice', // 发票信息页面
      name: 'invoice',
      component: resolve => {
        require(['../views/payroll/invoice.vue'], resolve)
      }
    },
    {
      path: '/question/:detailId', // 我有疑问页面
      name: 'question',
      component: resolve => {
        require(['../views/payroll/question.vue'], resolve)
      }
    },
    {
      path: '/trend', // 走势图页面
      name: 'trend',
      component: resolve => {
        require(['../views/payroll/trend.vue'], resolve)
      }
    },
    {
      path: '/manager', // 华夏管家页面
      name: 'manager',
      component: resolve => {
        require(['../views/payroll/manager.vue'], resolve)
      }
    },
    {
      path: '/manager-detail',
      name: 'managerDetail',
      component: resolve => {
        require(['../views/payroll/managerDetail.vue'], resolve)
      }
    },
    {
      path: '/tax-instructions', // 个税说明
      name: 'taxInstructions',
      component: resolve => {
        require(['../views/tax/taxInstructions.vue'], resolve)
      }
    },
    {
      path: '/tax-calculator', // 个税计算器
      name: 'taxCalculator',
      component: resolve => {
        require(['../views/tax/taxCalculator.vue'], resolve)
      }
    },
    {
      path: '/wallet', // 钱包记录页
      name: 'wallet',
      component: resolve => {
        require(['../views/wallet/index.vue'], resolve)
      }
    },
    /* {
      path: '/elife-index', // 喜闻乐荐首页
      name: 'elifeIndex',
      component: resolve => {
        require(['../views/elife/index.vue'], resolve)
      }
    },
    {
      path: '/elife-login', // 喜闻乐荐参与页
      name: 'elifeLogin',
      component: resolve => {
        require(['../views/elife/login.vue'], resolve)
      }
    },
    {
      path: '/elife-process', // 喜闻乐荐流程图页
      name: 'elifeProcess',
      component: resolve => {
        require(['../views/elife/process.vue'], resolve)
      }
    },
    {
      path: '/elife-xindex', // 薪有所属首页
      name: 'elifeXIndex',
      component: resolve => {
        require(['../views/elife/xindex.vue'], resolve)
      }
    },
    {
      path: '/elife-xlogin', // 心有所属登录页
      name: 'elifeXLogin',
      component: resolve => {
        require(['../views/elife/xlogin.vue'], resolve)
      }
    },
    {
      path: '/elife-xresult', // 心有所属结果页
      name: 'elifeXResult',
      component: resolve => {
        require(['../views/elife/xresult.vue'], resolve)
      }
    },
    {
      path: '/elife-xend', // 心有所属结束页
      name: 'elifeXEnd',
      component: resolve => {
        require(['../views/elife/xend.vue'], resolve)
      }
    },
    {
      path: '/tfinance-share', // 同事团分享前置页
      name: 'tfinanceShare',
      component: resolve => {
        require(['../views/tfinance/share.vue'], resolve)
      }
    },
    {
      path: '/tfinance-code', // 同事团获取code页
      name: 'tfinanceCode',
      component: resolve => {
        require(['../views/tfinance/code.vue'], resolve)
      }
    },
    {
      path: '/tfinance-list', // 同事团产品列表页
      name: 'tfinanceList',
      component: resolve => {
        require(['../views/tfinance/list.vue'], resolve)
      }
    },
    {
      path: '/tfinance-order', // 同事团预定页
      name: 'tfinanceOrder',
      component: resolve => {
        require(['../views/tfinance/order.vue'], resolve)
      }
    },
    {
      path: '/tfinance-confirm', // 同事团预定确认页
      name: 'tfinanceConfirm',
      component: resolve => {
        require(['../views/tfinance/confirm.vue'], resolve)
      }
    },
    {
      path: '/tfinance-result', // 同事团预定成功页
      name: 'tfinanceResult',
      component: resolve => {
        require(['../views/tfinance/result.vue'], resolve)
      }
    }, */
    {
      path: '/bank-site', // 银行网点页
      name: 'bankSite',
      component: resolve => {
        require(['../views/public/bankSite.vue'], resolve)
      }
    },
    {
      path: '/ad-picture', // 银行网点页
      name: 'adPicture',
      component: resolve => {
        require(['../views/public/adPicture.vue'], resolve)
      }
    },
    {
      path: '/about-us', // 关于我们
      name: 'aboutUs',
      component: resolve => {
        require(['../views/public/aboutUs.vue'], resolve)
      }
    },
    {
      path: '/wisale', // 唯销入口页面
      name: 'wisale',
      component: resolve => {
        require(['../views/wisale/enter.vue'], resolve)
      }
    },
    {
      path: '/welfare-list', // 福利货柜（券列表）
      name: 'welfareList',
      meta: {
        title: '员工福利'
      },
      component: resolve => {
        require(['../views/welfare/welfareList.vue'], resolve)
      }
    },
    {
      path: '/welfare-detail/:activityId',
      name: 'welfareDetail',
      meta: {
        title: '员工福利'
      },
      component: resolve => {
        require(['../views/welfare/welfareDetail.vue'], resolve)
      }
    },
    {
      path: '/welfare-goods-list/:activityId', // 福利货柜(礼品列表)
      name: 'welfareGoodsList',
      meta: {
        title: '礼品列表'
      },
      component: resolve => {
        require(['../views/welfare/goodsList.vue'], resolve)
      }
    },
    {
      path: '/welfare-goods-detail/:activityId', // 福利货柜(礼品详情)
      name: 'welfareGoodsDetail',
      meta: {
        title: '礼品详情'
      },
      component: resolve => {
        require(['../views/welfare/goodsDetail.vue'], resolve)
      }
    },
    {
      path: '/welfare-order-list/:activityId', // 福利货柜(订单记录)
      name: 'welfareOrderList',
      meta: {
        title: '兑换记录'
      },
      component: resolve => {
        require(['../views/welfare/orderList.vue'], resolve)
      }
    },
    {
      path: '/welfare-order-detail/:transOrderId', // 福利货柜(订单详情)
      name: 'welfareOrderDetail',
      meta: {
        title: '订单详情'
      },
      component: resolve => {
        require(['../views/welfare/orderDetail.vue'], resolve)
      }
    },
    {
      path: '/welfare-logistics-detail/:id', // 福利货柜(物流详情)
      name: 'welfareLogisticsDetail',
      meta: {
        title: '物流详情'
      },
      component: resolve => {
        require(['../views/welfare/logisticsDetail.vue'], resolve)
      }
    },
    {
      path: '/welfare-order-confirm/:activityId', // 福利货柜(确认实物订单)
      name: 'welfareOrderConfirm',
      meta: {
        title: '订单详情'
      },
      component: resolve => {
        require(['../views/welfare/orderConfirm.vue'], resolve)
      }
    },
    {
      path: '/address-List', // 收货地址
      name: 'addressList',
      meta: {
        title: '收货地址'
      },
      component: resolve => {
        require(['../views/user/addressList.vue'], resolve)
      }
    },
    {
      path: '/add-new-address',
      name: 'addNewAddress',
      meta: {
        title: '新增收货地址'
      },
      component: resolve => {
        require(['../views/user/addNewAddress.vue'], resolve)
      }
    },
    {
      path: '/notice',
      name: 'notice',
      component: resolve => {
        require(['../views/notice/index.vue'], resolve)
      }
    },
    {
      path: '/hr-index', // 汇融银行-跳转
      name: 'hrIndex',
      component: resolve => {
        require(['../views/hr/index.vue'], resolve)
      }
    },
    {
      path: '/hr-ebank', // 汇融银行-电子银行
      name: 'hrEbank',
      meta: {
        title: '电子银行'
      },
      component: resolve => {
        require(['../views/hr/ebank.vue'], resolve)
      }
    },
    {
      path: '/2019-ncov', // 新型冠状病毒
      name: '2019Ncov',
      component: resolve => {
        require(['../views/public/2019Ncov.vue'], resolve)
      }
    },
    {
      path: '/virus-auth', // 用户抗病毒授权页
      name: 'virusAuth',
      component: resolve => {
        require(['../views/virus/auth.vue'], resolve)
      }
    },
    {
      path: '/virus-code', // 用户抗病毒获取用户信息页
      name: 'virusCode',
      component: resolve => {
        require(['../views/virus/code.vue'], resolve)
      }
    },
    {
      path: '/virus-promise', // 用户抗病毒承诺页
      name: 'virusPromise',
      component: resolve => {
        require(['../views/virus/promise.vue'], resolve)
      }
    },
    {
      path: '/zx-test', // 振兴银行测试
      name: 'zxTest',
      component: resolve => {
        require(['../views/public/zxTest.vue'], resolve)
      }
    },
    {
      path: '/year-bill', // 年度账单
      name: 'yearBill',
      meta: {
        title: '放薪管家工资条年度账单'
      },
      component: resolve => {
        require(['../views/yearBill/index.vue'], resolve)
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
