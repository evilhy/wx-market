<template>
  <div class="go-exchange" @click="toPage">
    <van-image v-if="item.titleImgIdSet" lazy-load :src="`${imgBaseUrl}/${item.titleImgIdSet[0]}`" />
    <div class="information">
      <div class="goods">{{item.goodsName}}</div>
      <div class="count"><span>数量*1</span><span class="arrow"></span></div>
      <div class="hot" v-if="type === 'goods'">{{item.exchangeCnt}}位同事曾兑换</div>
      <div class="order-id" v-else>订单编号:{{item.transOrderId}}</div>
    </div>
  </div>
</template>
<script>
import sysConfig from 'utils/constant'
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          titleImgIdSet: []
        }
      }
    },
    type: {
      type: String,
      default: 'goods'
    },
    activityId: String
  },
  data () {
    return {
      imgBaseUrl: sysConfig.wisalesImgUrl[process.env.NODE_ENV]
    }
  },
  methods: {
    toPage () {
      if (this.type === 'goods') {
        this.$router.push({ name: 'welfareGoodsDetail', params: { activityId: this.activityId }, query: { goodsId: this.item.goodsId } })
      } else {
        this.$router.push({ name: 'welfareOrderDetail', params: { transOrderId: this.item.transOrderId } })
      }
    }
  }
}
</script>