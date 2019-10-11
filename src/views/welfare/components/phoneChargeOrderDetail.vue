<template>
  <div class="phone-charge">
    <div class="desc-wrap">
      <div class="row"><span class="label">兑换说明</span><span class="value">{{orderInfo.goodsName}}</span></div>
      <div class="row"><span class="label">手机号</span><span class="value">{{orderInfo.rechargePhone}}</span></div>
      <div class="row"><span class="label">支出</span><span class="value">礼品兑换券x1</span></div>
      <div class="row"><span class="label">创建时间</span><span class="value">{{orderInfo.transTime | date}}</span></div>
      <div class="row"><span class="label">订单编号</span><span class="value">{{orderInfo.transOrderId}}</span></div>
      <div class="row"><span class="label">订单状态</span><span class="value" :class="status">{{statusDic[status]}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      statusDic: {
        success: '充值成功',
        waiting: '充值中',
        fail: '充值失败'
      }
    }
  },
  computed: {
    status () {
      let orderDealStatus = this.orderInfo.orderDealStatus
      switch (orderDealStatus) {
        case 'MERCOMPLETE':
          return 'success'
        case 'PAYFAIL':
        case 'MERFAIL':
          return 'fail'
        default:
          return 'waiting'
      }
    }
  },
  created () {},
  methods: {}
}
</script>