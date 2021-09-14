<template>
  <div class="order-detail-page">
    <component :is="componentType" :order-info="orderInfo" :status-info="statusInfo"></component>
    <div class="detail-img-wrap" v-if="orderInfo.detailImgIdSet && orderInfo.detailImgIdSet.length && componentType !== 'realGoodsOrderDetail'">
      <img v-for="(id, index) in orderInfo.detailImgIdSet" :key="index" v-lazy="`${imgBaseUrl}/${id}`" />
    </div>
    <return-list-btn :activity-id="orderInfo.activityId" v-if="componentType !== 'realGoodsOrderDetail'"></return-list-btn>
  </div>
</template>

<script>
import sysConfig from 'utils/constant'
import phoneChargeOrderDetail from './components/phoneChargeOrderDetail'
import virtualOrderDetail from './components/virtualOrderDetail'
import realGoodsOrderDetail from './components/realGoodsOrderDetail'
import returnListBtn from './components/returnListBtn'
import orderStatus from './orderStatus'

export default {
  mixins: [orderStatus],
  data() {
    return {
      transOrderId: this.$route.params.transOrderId,
      orderInfo: {
        detailImgIdSet: []
      },
      imgBaseUrl: sysConfig.wisalesImgUrl[process.env.VUE_APP_ENV]
    }
  },
  computed: {
    componentType() {
      const itemCatId = this.orderInfo.itemCatId
      if (!itemCatId) return ''
      const { phoneCharge, phoneData, starbucks, videoMember, viewingTicket, oilCard } = sysConfig
      switch (itemCatId) {
        case phoneCharge: // 话费
        case phoneData: // 流量
          return 'phoneChargeOrderDetail'
        case videoMember: // 视频会员
        case viewingTicket: // 观影券
        case oilCard: // 油卡
        case starbucks: // 星巴克
          return 'virtualOrderDetail'
        default:
          // 实物
          return 'realGoodsOrderDetail'
      }
    }
  },
  created() {
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      const res = await this.$WelfareCust.orderDetail(this.transOrderId)
      this.orderInfo = res.data
    }
  },
  components: {
    phoneChargeOrderDetail,
    virtualOrderDetail,
    realGoodsOrderDetail,
    returnListBtn
  }
}
</script>
