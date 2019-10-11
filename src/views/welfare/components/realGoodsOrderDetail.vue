<template>
  <div class="real-goods">
    <img class="img-status" :src="statusImgSrc" />
    <div class="receive-address">
      <van-icon name="location-o" class="location" size="15px" />
      <div class="text">
        <p class="name">{{orderInfo.receiveName}}&nbsp;{{orderInfo.receivePhone}}</p>
        <p class="detail">
          {{orderInfo.province}}{{orderInfo.city}}{{orderInfo.county}}{{orderInfo.town}}{{orderInfo.address}}
        </p>
      </div>
    </div>
    <div class="logistics-wrap" v-if="status === 'shipped' || status === 'received'">
      <van-button plain round size="small" @click="toLogistics">查看物流</van-button>
    </div>
    <go-exchange :item="orderInfo" :activity-id="orderInfo.activityId"></go-exchange>
    <div class="row">
      <span class="label">订单编号：</span><span class="value">{{orderInfo.transOrderId}}</span>
      <i class="iconfont icon-fuzhi" v-clipboard:copy="orderInfo.transOrderId" v-clipboard:success="onCopy"></i>
    </div>
    <div class="row"><span class="label">下单时间：</span><span class="value">{{orderInfo.transTime | date}}</span></div>
    <div class="fixed-bottom-wrap">售后请联系 <a href="tel: 400-882-1081">400-882-1081</a></div>
  </div>
</template>

<script>
import goExchange from 'components/goExchange'
import helper from 'utils/helper'
import storage from 'utils/storage'
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
    return {}
  },
  computed: {
    status () {
      /* ORDERCANCEL("订单取消"),
         ORDERFAIL("下单失败"),
         PREPAYMENT("下单成功,待支付"),
         PAYFAIL("支付失败"),
         PAYPROCESSING("支付中"),
         MERPREPARE("支付成功,商户待下单"),
         MERALREADY("商户已发货"),
         MERCOMPLETE("客户已收货"),
         MERPROCESSING("商户下单处理中"),
         MERORDERSUCCESS("商户下单成功"),
         MERFAIL("商户处理失败")
       */
      let orderDealStatus = this.orderInfo.orderDealStatus
      switch (orderDealStatus) {
        case 'PREPAYMENT':
          return 'success' // 下单成功
        case 'PAYFAIL':
        case 'MERFAIL':
          return 'fail' // 下单失败
        case 'MERALREADY':
          return 'shipped' // 已发货
        case 'MERCOMPLETE':
          return 'received' // 已收货
        default:
          return 'waiting' // 待发货
      }
    },
    statusImgSrc () {
      return require(`../../../assets/img/welfare/real-order-${this.status}.png`)
    }
  },
  created () { },
  methods: {
    toLogistics () {
      storage.setSession('orderInfo', this.orderInfo)
      this.$router.push({ name: 'welfareLogisticsDetail', params: { id: this.orderInfo.transOrderId } })
    },
    onCopy (e) {
      helper.toast('复制成功')
    }
  },
  components: {
    goExchange
  }
}
</script>