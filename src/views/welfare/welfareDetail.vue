<template>
  <div class="welfare-detail-page">
    <div class="goods-bg"></div>
    <div class="goods-desc">礼品任选x{{ info.unExchangeCnt }}</div>
    <div class="main">
      <img class="img1" src="../../assets/img/welfare/activity-s1.png" alt="" />
      <div class="wish">{{ info.activityGreetingsDesc }}</div>
      <img class="img2" src="../../assets/img/welfare/activity-s2.png" alt="" />
      <div class="btn" :class="btnInfo.className" @click="toPage('welfareGoodsList', { activityId })">{{ btnInfo.text }}</div>
      <div class="record" @click="toPage('welfareOrderList', { activityId })">兑换记录<span class="arrow"></span></div>
    </div>
    <div class="footer">
      本福利由
      <div class="company">{{ info.entShowInfo }}</div>
      提供
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activityId: this.$route.params.activityId,
      info: {
        activityGreetingsDesc: '',
        activityStatus: -1,
        activityStatusDesc: '',
        entShowInfo: '',
        unExchangeCnt: -1
      }
    }
  },
  computed: {
    btnInfo() {
      let { activityStatus, unExchangeCnt } = this.info
      if (activityStatus === 3) {
        return {
          className: 'disabled',
          text: '活动已结束'
        }
      }
      if (!unExchangeCnt) {
        return {
          className: 'disabled',
          text: '已兑换'
        }
      }
      return {
        className: 'active',
        text: '兑换礼品'
      }
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    async getDetail() {
      let res = await this.$WelfareActivity.activityDetail(this.activityId)
      this.info = res.data
    },
    toPage(routerName, params = {}) {
      this.$router.push({ name: routerName, params })
    }
  }
}
</script>

<style scoped></style>
