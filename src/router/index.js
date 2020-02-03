import Vue from 'vue'
import Router from 'vue-router'
import manager from '../views/payroll/manager.vue'
import getId from '../views/public/getId.vue'
import token from '../views/public/token.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/get-id', // 公共入口页面getId
      name: 'getId',
      meta: {
        title: '放薪管家'
      },
      component: getId, // 检查
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
      name: 'bindIdCard', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/bindIdCard.vue'], resolve)
      }
    },
    {
      path: '/choose-phone', // 身份绑定--选择手机号页面
      name: 'choosePhone', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/choosePhone.vue'], resolve)
      }
    },
    {
      path: '/set-query-code', // 设置6位查询密码
      name: 'setQueryCode', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/setQueryCode.vue'], resolve)
      }
    },
    {
      path: '/complete', // 绑定|设置查询密码完成页面
      name: 'complete', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/complete.vue'], resolve)
      }
    },
    {
      path: '/bind-tel', // 身份绑定--绑定手机号
      name: 'bindTel', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/bindTel.vue'], resolve)
      }
    },
    {
      path: '/send-code/', // 身份绑定--发送验证码
      name: 'sendCode', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/sendCode.vue'], resolve)
      }
    },
    {
      path: '/check-card-tail/', // 身份绑定--验证银行卡后6位
      name: 'checkCardTail', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/public/checkCardTail.vue'], resolve)
      }
    },
    {
      path: '/concat-ent-manager/', // 联系企业管理员
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
      name: 'home', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/home.vue'], resolve)
      }
    },
    {
      path: '/check-query-code', // 密码验证
      name: 'checkQueryCode',
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/checkQueryCode.vue'], resolve)
      }
    },
    {
      path: '/forget-send-code', // 忘记查询密码--发送验证码
      name: 'forgetSendCode', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/forgetSendCode.vue'], resolve)
      }
    },
    {
      path: '/set-new-query-code', // 设置新的查询密码
      name: 'setNewQueryCode', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/setNewQueryCode.vue'], resolve)
      }
    },
    {
      path: '/wage-index/:wageSheetId', // 工资首页
      name: 'wageIndex', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageIndex.vue'], resolve)
      }
    },
    {
      path: '/wage-detail', // 工资条详情页面
      name: 'wageDetail', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageDetail.vue'], resolve)
      }
    },
    {
      path: '/wage-list', // 薪资列表页
      name: 'wageList', // 检查
      meta: {
        title: '放薪管家'
      },
      component: resolve => {
        require(['../views/payroll/wageList.vue'], resolve)
      }
    },
    {
      path: '/user', // 个人信息首页
      name: 'user', // 检查
      meta: {
        title: '个人信息'
      },
      component: resolve => {
        require(['../views/user/index.vue'], resolve)
      }
    },
    {
      path: '/user-ents', // 个人信息-任职企业
      name: 'userEnts', // 检查
      meta: {
        title: '任职企业'
      },
      component: resolve => {
        require(['../views/user/ents.vue'], resolve)
      }
    },
    {
      path: '/user-detail', // 个人信息详情
      name: 'userDetail', // 检查
      meta: {
        title: '员工信息'
      },
      component: resolve => {
        require(['../views/user/detail.vue'], resolve)
      }
    },
    {
      path: '/modify-query-code', // 个人信息-修改查询密码
      name: 'modifyQueryCode', // 检查
      meta: {
        title: '修改查询密码'
      },
      component: resolve => {
        require(['../views/user/modifyQueryCode.vue'], resolve)
      }
    },
    {
      path: '/bankcard-list', // 个人信息-银行卡列表
      name: 'bankcardList', // 检查
      meta: {
        title: '银行卡'
      },
      component: resolve => {
        require(['../views/user/bankcardList.vue'], resolve)
      }
    },
    {
      path: '/bankcard-history', // 个人信息-银行卡历史记录
      name: 'bankcardHistory', // 检查
      meta: {
        title: '修改记录'
      },
      component: resolve => {
        require(['../views/user/bankcardHistory.vue'], resolve)
      }
    },
    {
      path: '/select-modify-way', // 修改手机号-选择验证方式
      name: 'selectModifyWay', // 检查
      meta: {
        title: '修改手机号'
      },
      component: resolve => {
        require(['../views/user/selectModifyWay.vue'], resolve)
      }
    },
    {
      path: '/check-old-phone', // 修改手机号-旧手机号验证
      name: 'checkOldPhone', // 检查
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
      name: 'checkEntPhone', // 检查
      meta: {
        title: '修改手机号'
      },
      component: resolve => {
        require(['../views/user/checkEntPhone.vue'], resolve)
      }
    },
    {
      path: '/confirm-modify-phone', // 修改手机号-确认绑定新手机号
      name: 'confirmModifyPhone', // 检查
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
      name: 'invoice', // 检查
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
      component: manager,
      name: 'manager'
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
      path: '/elife-index', // 喜闻乐荐首页
      name: 'elifeIndex', // 检查
      component: resolve => {
        require(['../views/elife/index.vue'], resolve)
      }
    },
    {
      path: '/elife-login', // 喜闻乐荐参与页
      name: 'elifeLogin', // 检查
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
    },
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
      path: '/welfare-detail/:activityId', // 福利货柜（券详情）
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
