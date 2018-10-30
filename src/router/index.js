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
      path: '/elife',
      name: 'elife',
      component: resolve => { require(['../views/elife/index.vue'], resolve) }
    },
    {
      path: '/elife-login',
      name: 'elifeLogin',
      component: resolve => { require(['../views/elife/login.vue'], resolve) }
    }
  ]
})
