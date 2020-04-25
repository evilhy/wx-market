<template>
  <div class="item" @click="toDetail">
    <van-image class="goods-img" lazy-load :src="`${imgBaseUrl}/${item.coverUrl}`" />
    <div class="goods-name">{{item.goodsName}}</div>
    <div class="exchange">
      <img class="hot" src="../../../assets/img/welfare/icon-colleague.png" alt="">{{item.exchangeCnt}}位同事曾兑换
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
        return {}
      }
    }
  },
  data () {
    return {
      activityId: this.$route.params.activityId,
      imgBaseUrl: sysConfig.wisalesImgUrl[process.env.NODE_ENV]
    }
  },
  methods: {
    toDetail () {
      this.$router.push({ name: 'welfareGoodsDetail', params: { activityId: this.activityId }, query: { goodsId: this.item.goodsId } })
    }
  }
}
</script>