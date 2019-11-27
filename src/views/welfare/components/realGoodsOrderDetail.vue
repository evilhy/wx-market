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
    <div class="logistics-wrap" v-if="statusInfo.status === 'shipped' || statusInfo.status === 'received'">
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
    },
    statusInfo: {
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
    statusImgSrc () {
      return require(`../../../assets/img/welfare/real-order-${this.statusInfo.status}.png`)
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