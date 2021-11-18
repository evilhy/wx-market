<template>
  <div class="real-goods">
    <img class="img-status" :src="statusImgSrc" />
    <div class="receive-address">
      <van-icon name="location-o" class="location" />
      <div class="text">
        <p class="name">{{ orderInfo.receiveName }}&nbsp;{{ orderInfo.receivePhone }}</p>
        <p class="detail">{{ orderInfo.province }}{{ orderInfo.city }}{{ orderInfo.county }}{{ orderInfo.town }}{{ orderInfo.address }}</p>
      </div>
    </div>
    <div class="logistics-wrap" v-if="statusInfo.status === 'shipped' || statusInfo.status === 'received'">
      <van-button plain round size="small" @click="toLogistics">查看物流</van-button>
    </div>
    <go-exchange :item="orderInfo" :activity-id="orderInfo.activityId"></go-exchange>
    <div class="row">
      <span class="label">订单编号：</span><span class="value">{{ orderInfo.transOrderId }}</span>
      <svg-icon svg-name="copy" @click="copy(orderInfo.transOrderId)"></svg-icon>
    </div>
    <div class="row">
      <span class="label">下单时间：</span><span class="value">{{ $filter.date(orderInfo.transTime) }}</span>
    </div>
    <div class="fixed-bottom-wrap">售后请联系 <a href="tel: 400-882-1081">400-882-1081</a></div>
  </div>
</template>

<script>
import goExchange from 'components/goExchange'
import helper from 'utils/helper'
import storage from 'utils/storage'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useClipboard from 'vue-clipboard3'

export default {
  props: {
    orderInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    statusInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  setup (props) {
    const router = useRouter()
    // computed
    const statusImgSrc = computed(() => require(`../../../assets/img/welfare/real-order-${props.statusInfo.status}.png`))
    // methods
    const toLogistics = () => {
      storage.setSession('orderInfo', props.orderInfo)
      router.push({ name: 'welfareLogisticsDetail', params: { id: props.orderInfo.transOrderId } })
    }

    const { toClipboard } = useClipboard()
    const copy = async(text) => {
      try {
        await toClipboard(text)
        helper.toast('复制成功')
      } catch (e) {
        console.error(e)
      }
    }
    return {
      statusImgSrc,
      toLogistics,
      copy
    }
  },
  components: {
    goExchange
  }
}
</script>
