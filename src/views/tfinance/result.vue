<template>
  <div class="t-finance-result-page t-finance-page">
    <result-outline :term="currentTerm" :product-info="productInfo" :result="result" @end="countDownEnd" @more="openMore"></result-outline>
    <result-product :term="currentTerm" :status="result.status" :product-info="productInfo"></result-product>
    <result-client :result="result" :product-info="productInfo"></result-client>
    <share-mark v-if="shareFlag" @close="shareFlag = false"></share-mark>
    <buy-notice ref="buy-notice" :buy-start="productInfo.subscribeStartDate" :buy-end="productInfo.subscribeEndDate"></buy-notice>
    <div class="bottom-action">
      <div class="btn theme-btn half" @click="openNotice">认购须知</div>
      <div class="btn white-btn half" @click="shareFlag = true">邀请同事</div>
    </div>
    <ordered-popup ref="ordered-popup"></ordered-popup>
  </div>
</template>
<script>
import resultOutline from './components/resultOutline'
import resultProduct from './components/resultProduct'
import resultClient from './components/resultClient'
import shareMark from './components/shareMark'
import buyNotice from './components/buyNotice'
import orderedPopup from './components/orderedPopup'
import helper from 'utils/helper'
import tShare from 'mixins/tShare'
export default {
  mixins: [tShare],
  data () {
    return {
      currentTerm: 0,  // 1.预约期 2.过渡期 3.认购期 4.认购结束 5.兑付结束
      result: {
        status: 1,   // 1.预约成功 2.认购成功
        intentAmount: 0,
        crtDateTime: 0,
        subcribeAmount: 0,
        subcribeDateTime: 0,
        profit: 0,
        dealDateTime: 0,
        list: []
      },
      productInfo: {
        nowDate: 0,
        intentStartDate: 0,
        intentEndDate: 0,
        subscribeStartDate: 0,
        subscribeEndDate: 0
      },
      shareFlag: false,
      noticeFlag: false
    }
  },
  created () {
    helper.title('理财预约')
    this.shareConfig()
    this.getResult()
  },
  methods: {
    async getResult () {
      let res = await this.$Tfinance.intentInfo()
      this.result = res.data
      this.productInfo = res.data.productInfoDTO
      this.calTerm()
    },
    calTerm () {
      let { nowDate, intentEndDate, subscribeStartDate, subscribeEndDate } = this.productInfo
      if (nowDate < intentEndDate) { // 预约期
        this.currentTerm = 1
      } else if (nowDate >= intentEndDate && nowDate < subscribeStartDate) { // 过渡期
        this.currentTerm = 2
      } else if (nowDate >= subscribeStartDate && nowDate < subscribeEndDate) { // 认购期
        this.currentTerm = 3
      } else if (nowDate >= subscribeEndDate && nowDate < this.result.dealDateTime) { // 认购结束
        this.currentTerm = 4
      } else { // 兑付结束
        this.currentTerm = 5
      }
    },
    countDownEnd (term) {
      this.currentTerm = term
    },
    openNotice () {
      this.$refs['buy-notice'].show()
    },
    openMore () {
      this.$refs['ordered-popup'].show()
    }
  },
  components: {
    resultOutline,
    resultProduct,
    resultClient,
    shareMark,
    buyNotice,
    orderedPopup
  }
}
</script>
