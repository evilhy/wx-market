<template>
  <div class="common-goods-detail">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(id, index) in goodsInfo.titleImgIdSet" :key="index">
        <img v-lazy="`${imgBaseUrl}/${id}`" class="img">
      </van-swipe-item>
    </van-swipe>
    <div class="goods-info">
      <div class="goods-name">{{goodsInfo.goodsName}}</div>
      <div class="exchange">
        <img class="hot" src="../../../assets/img/welfare/icon-colleague.png" alt="">{{goodsInfo.exchangeCnt}}位同事曾兑换
      </div>
    </div>
    <div class="detail-img-wrap" v-if="goodsInfo.detailImgIdSet && goodsInfo.detailImgIdSet.length">
      <div class="detail-img-title">礼品介绍</div>
      <img v-for="(id, index) in goodsInfo.detailImgIdSet" :key="index" v-lazy="`${imgBaseUrl}/${id}`">
    </div>
    <div class="fixed-btn-wrap">
      <div>福利资格：<span class="stress">礼品任选*{{goodsInfo.unExchangeCnt}}</span></div>
      <exchange-btn class-name="exchange-btn" :disabled="loading" :goods-info="goodsInfo" @submit="confirm">
      </exchange-btn>
    </div>
  </div>
</template>

<script>
import exchangeBtn from './exchangeBtn'
import sysConfig from 'utils/constant'
export default {
  props: {
    activityId: String,
    goodsInfo: {
      type: Object,
      default () {
        return {
          titleImgIdSet: [],
          detailImgIdSet: []
        }
      }
    }
  },
  data () {
    return {
      imgBaseUrl: sysConfig.wisales_img_url[process.env.NODE_ENV],
      loading: false
    }
  },
  computed: {
    virtual () {
      let { carWashTicket, videoMember, viewingTicket, starbucks, oilCard } = sysConfig
      let itemCatId = this.goodsInfo.itemCatId
      return itemCatId === carWashTicket || itemCatId === videoMember || itemCatId === viewingTicket || itemCatId === starbucks || itemCatId === oilCard
    }
  },
  created () { },
  methods: {
    confirm () {
      if (!this.virtual) { // 实物商品
        this.loading = true
        this.$router.push({ name: 'welfareOrderConfirm', params: { activityId: this.activityId }, query: { goodsId: this.goodsInfo.goodsId } })
        return
      }
      this.$dialog
        .confirm({
          message: '确认要兑换该礼品吗?',
          confirmButtonText: '确认兑换',
          cancelButtonText: '暂不兑换'
        })
        .then(() => {
          this.exchangeGoods()
        })
        .catch(() => { })
    },
    async exchangeGoods () {
      try {
        this.loading = true
        let res = await this.$WelfareCustOrder.welfareExchange(this.activityId, this.goodsInfo.goodsId)
        this.$router.push({ name: 'welfareOrderDetail', params: { transOrderId: res.data.transOrderId } })
      } catch (e) {
        this.loading = false
      }
    }
  },
  components: {
    exchangeBtn
  }
}
</script>