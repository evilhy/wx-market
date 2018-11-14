import Vue from 'vue'
import Router from 'vue-router'
import manager from '../views/payroll/manager.vue'
import getId from '../views/public/getId.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/get-id', // 公共入口页面getId
      name: 'getId',
      component: getId,
      alias: '/'
    },
    {
      path: '/bind-id-card', // 身份证绑定页面cardIDFBill
      name: 'bindIdCard',
      component: resolve => { require(['../views/public/bindIdCard.vue'], resolve) }
    },
    {
      path: '/home', // 首页
      name: 'home',
      component: resolve => { require(['../views/payroll/home.vue'], resolve) }
    },
    {
      path: '/wage-index/:wageSheetId', // 工资首页
      name: 'wageIndex',
      component: resolve => { require(['../views/payroll/wageIndex.vue'], resolve) }
    },
    {
      path: '/wage-detail', // 工资条详情页面
      name: 'wageDetail',
      component: resolve => { require(['../views/payroll/wageDetail.vue'], resolve) }
    },
    {
      path: '/choose-phone', // 选择手机号页面 chooseCardID
      name: 'choosePhone',
      component: resolve => { require(['../views/public/choosePhone.vue'], resolve) }
    },
    {
      path: '/id-card-binded', // 身份证被其他微信号绑定了
      name: 'idCardBinded',
      component: resolve => { require(['../views/public/idCardBinded.vue'], resolve) }
    },
    {
      path: '/phone-empty', // 身份证对应的用户信息中无手机号
      name: 'phoneEmpty',
      component: resolve => { require(['../views/public/phoneEmpty.vue'], resolve) }
    },
    {
      path: '/send-code/', // 发送验证码页面codeFBill
      name: 'sendCode',
      component: resolve => { require(['../views/public/sendCode.vue'], resolve) }
    },
    {
      path: '/feed-back', // 身份证已绑定返回页面
      name: 'feedBack',
      component: resolve => { require(['../views/public/feedBack.vue'], resolve) }
    },
    {
      path: '/wage-list', // 薪资列表页
      name: 'wageList',
      component: resolve => { require(['../views/payroll/wageList.vue'], resolve) }
    },
    {
      path: '/personal', // 个人信息页面
      name: 'personal',
      component: resolve => { require(['../views/payroll/personal.vue'], resolve) }
    },
    {
      path: '/no-wage',
      name: 'noWage',
      component: resolve => { require(['../views/payroll/noWage.vue'], resolve) }
    },
    {
      path: '/invoice', // 发票信息页面
      name: 'invoice',
      component: resolve => { require(['../views/payroll/invoice.vue'], resolve) }
    },
    {
      path: '/question/:detailId', // 我有疑问页面
      name: 'question',
      component: resolve => { require(['../views/payroll/question.vue'], resolve) }
    },
    {
      path: '/trend', // 走势图页面
      name: 'trend',
      component: resolve => { require(['../views/payroll/trend.vue'], resolve) }
    },
    {
      path: '/manager',  // 华夏管家页面
      component: manager,
      name: 'manager'
    },
    {
      path: '/manager-detail',
      name: 'managerDetail',
      component: resolve => { require(['../views/payroll/managerDetail.vue'], resolve) }
    },
    {
      path: '/tax-calculator',  // 个税计算器
      name: 'taxCalculator',
      component: resolve => { require(['../views/tax/taxCalculator.vue'], resolve) }
    },
    {
      path: '/elife-index',       // 喜闻乐荐首页
      name: 'elifeIndex',
      component: resolve => { require(['../views/elife/index.vue'], resolve) }
    },
    {
      path: '/elife-login',   // 喜闻乐荐参与页
      name: 'elifeLogin',
      component: resolve => { require(['../views/elife/login.vue'], resolve) }
    },
    {
      path: '/elife-process',   // 喜闻乐荐流程图页
      name: 'elifeProcess',
      component: resolve => { require(['../views/elife/process.vue'], resolve) }
    },
    {
      path: '/elife-xindex',   // 薪有所属首页
      name: 'elifeXIndex',
      component: resolve => { require(['../views/elife/xindex.vue'], resolve) }
    },
    {
      path: '/elife-xlogin',   // 心有所属登录页
      name: 'elifeXLogin',
      component: resolve => { require(['../views/elife/xlogin.vue'], resolve) }
    },
    {
      path: '/elife-xresult',   // 心有所属结果页
      name: 'elifeXResult',
      component: resolve => { require(['../views/elife/xresult.vue'], resolve) }
    },
    {
      path: '/tfinance-share',   // 同事团分享前置页
      name: 'tfinanceShare',
      component: resolve => { require(['../views/tfinance/share.vue'], resolve) }
    },
    {
      path: '/tfinance-code',   // 同事团获取code页
      name: 'tfinanceCode',
      component: resolve => { require(['../views/tfinance/code.vue'], resolve) }
    },
    {
      path: '/tfinance-list',   // 同事团产品列表页
      name: 'tfinanceList',
      component: resolve => { require(['../views/tfinance/list.vue'], resolve) }
    },
    {
      path: '/tfinance-order',   // 同事团预定页
      name: 'tfinanceOrder',
      component: resolve => { require(['../views/tfinance/order.vue'], resolve) }
    },
    {
      path: '/tfinance-confirm',  // 同事团预定确认页
      name: 'tfinanceConfirm',
      component: resolve => { require(['../views/tfinance/confirm.vue'], resolve) }
    },
    {
      path: '/tfinance-result',   // 同事团预定成功页
      name: 'tfinanceResult',
      component: resolve => { require(['../views/tfinance/result.vue'], resolve) }
    },
    {
      path: '/bank-site',         // 银行网点页
      name: 'bankSite',
      component: resolve => { require(['../views/public/bankSite.vue'], resolve) }
    }
  ]
})
