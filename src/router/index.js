import Vue from 'vue'
import Router from 'vue-router'
import manager from '../views/manager.vue'
import getId from '../views/getId.vue'

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
      component: resolve => { require(['../views/bindIdCard.vue'], resolve) }
    },
    {
      path: '/home', // 首页
      name: 'home',
      component: resolve => { require(['../views/home.vue'], resolve) }
    },
    {
      path: '/wage-index/:planId', // 工资首页
      name: 'wageIndex',
      component: resolve => { require(['../views/wageIndex.vue'], resolve) }
    },
    {
      path: '/wage-detail', // 工资条详情页面
      name: 'wageDetail',
      component: resolve => { require(['../views/wageDetail.vue'], resolve) }
    },
    {
      path: '/choose-phone', // 选择手机号页面 chooseCardID
      name: 'choosePhone',
      component: resolve => { require(['../views/choosePhone.vue'], resolve) }
    },
    {
      path: '/id-card-binded', // 身份证被其他微信号绑定了
      name: 'idCardBinded',
      component: resolve => { require(['../views/idCardBinded.vue'], resolve) }
    },
    {
      path: '/phone-empty', // 身份证对应的用户信息中无手机号
      name: 'phoneEmpty',
      component: resolve => { require(['../views/phoneEmpty.vue'], resolve) }
    },
    {
      path: '/send-code/', // 发送验证码页面codeFBill
      name: 'sendCode',
      component: resolve => { require(['../views/sendCode.vue'], resolve) }
    },
    {
      path: '/feed-back', // 身份证已绑定返回页面
      name: 'feedBack',
      component: resolve => { require(['../views/feedBack.vue'], resolve) }
    },
    {
      path: '/wage-list', // 薪资列表页
      name: 'wageList',
      component: resolve => { require(['../views/wageList.vue'], resolve) }
    },
    {
      path: '/personal', // 个人信息页面
      name: 'personal',
      component: resolve => { require(['../views/personal.vue'], resolve) }
    },
    {
      path: '/no-wage',
      name: 'noWage',
      component: resolve => { require(['../views/noWage.vue'], resolve) }
    },
    {
      path: '/invoice', // 发票信息页面
      name: 'invoice',
      component: resolve => { require(['../views/invoice.vue'], resolve) }
    },
    {
      path: '/question/:detailId', // 我有疑问页面
      name: 'question',
      component: resolve => { require(['../views/question.vue'], resolve) }
    },
    {
      path: '/trend', // 走势图页面
      name: 'trend',
      component: resolve => { require(['../views/trend.vue'], resolve) }
    },
    {
      path: '/manager',  // 华夏管家页面
      component: manager,
      name: 'manager',
      redirect: '/manager/contact',
      children: [
        {
          path: 'contact', // 联系我们
          component: resolve => { require(['../views/managerContact.vue'], resolve) },
          name: 'managerContact'
        },
        {
          path: 'business', // 业务办理
          component: resolve => { require(['../views/managerBusiness.vue'], resolve) },
          name: 'managerBusiness'
        },
        {
          path: 'msg',  // 留言咨询
          component: resolve => { require(['../views/managerMsg.vue'], resolve) },
          name: 'managerMsg'
        }
      ]
    },
    {
      path: '/manager-detail',
      name: 'managerDetail',
      component: resolve => { require(['../views/managerDetail.vue'], resolve) }
    }
  ]
})
