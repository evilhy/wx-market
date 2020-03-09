<template>
  <div class="van-logistics-detail-page">
    <empty v-if="!trackInfo.shipmentName && requested" text="暂无物流信息" type="exchange"></empty>
    <template v-else>
      <div class="van-goods-info">
        <van-image class="van-goods-img" v-if="orderInfo.titleImgIdSet" lazy-load :src="`${imgBaseUrl}/${orderInfo.titleImgIdSet[0]}`" />
        <div class="van-goods-text">
          <p class="van-title">{{orderInfo.goodsName}}</p>
          <p class="van-company"><span class="gray">{{trackInfo.shipmentName}}</span><span class="stress">：{{trackInfo.shipmentOrder}}</span></p>
        </div>
      </div>
      <div class="van-track-info">
        <div class="van-address">
          <van-icon name="location-o" class="location" size="15px" />
          <p class="van-detail">
            {{orderInfo.province}}{{orderInfo.city}}{{orderInfo.county}}{{orderInfo.town}}{{orderInfo.address}}
          </p>
        </div>
        <van-steps class="van-track-list" direction="vertical" :active="0" :active-color="trackInfo.status === 'signed' ? '#DE4444' : '#2a88ed'" :active-icon="trackInfo.status === 'signed' ? 'checked' : 'location'">
          <van-step v-for="(item, index) in trackInfo.contents" :key="index">
            <p class="van-desc">{{item.description}}</p>
            <p class="van-time">{{item.time}}</p>
          </van-step>
        </van-steps>
      </div>
    </template>
  </div>
</template>

<script>
import noData from 'components/noData'
import storage from 'utils/storage'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      transOrderId: this.$route.params.id,
      orderInfo: {
        goodsName: '',
        goodsInfo: {
          titleImgIdSet: []
        }
      },
      trackInfo: {
        shipmentName: '',
        shipmentOrder: '',
        contents: []
      },
      requested: false,
      imgBaseUrl: sysConfig.wisales_img_url[process.env.NODE_ENV]
    }
  },
  created () {
    this.orderInfo = storage.getSession('orderInfo')
    this.getTrack()
  },
  methods: {
    async getTrack () {
      let res = await this.$WelfareCust.orderTrack(this.transOrderId)
      this.trackInfo = res.data
      this.requested = true
    }
  },
  components: {
    noData
  }
}
</script>