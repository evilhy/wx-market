<template>
  <div class="goods-detail-page">
    <component :is="componentType" :activity-id="activityId" :goods-info="goodsInfo"></component>
    <return-list-btn :activity-id="activityId"></return-list-btn>
  </div>
</template>

<script>
import returnListBtn from './components/returnListBtn'
import phoneChargeDetail from './components/phoneChargeDetail'
import commonGoodsDetail from './components/commonGoodsDetail'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      activityId: this.$route.params.activityId,
      goodsId: this.$route.query.goodsId,
      goodsInfo: {}
    }
  },
  computed: {
    componentType () {
      let itemCatId = this.goodsInfo.itemCatId
      if (!itemCatId) return ''
      let { phoneCharge, phoneData } = sysConfig
      switch (itemCatId) {
        case phoneCharge: // 话费
        case phoneData: // 流量
          return 'phoneChargeDetail'
        default:
          return 'commonGoodsDetail'
      }
    }
  },
  created () {
    this.getGoodsDetail()
  },
  methods: {
    async getGoodsDetail () {
      let res = await this.$WelfareGoods.goodsDetail(this.activityId, this.goodsId)
      this.goodsInfo = res.data
    }
  },
  components: {
    returnListBtn,
    phoneChargeDetail,
    commonGoodsDetail
  }
}
</script>