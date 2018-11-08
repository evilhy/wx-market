<template>
  <div class="t-finance-order-page t-finance-page">
    <template v-if="!orderEnd">
      <product-level :mark-list="productInfo.markList" :order-num="productInfo.intentNum" :term="productInfo.productTerm"></product-level>
      <product-notice></product-notice>
      <product-point></product-point>
      <activity-rule :order-start="productInfo.intentStartDate" :order-end="productInfo.intentEndDate" :buy-start="productInfo.subscribeStartDate" :buy-end="productInfo.subscribeEndDate"></activity-rule>
      <all-ordered v-if="productInfo.show==='0'" :product-id="query.productId"></all-ordered>
      <colleague-ordered v-if="productInfo.show==='1'" type="part"></colleague-ordered>
      <div class="bottom-action">
        <div class="fixed-time">
          <template v-if="orderStart">
            剩余<count-down :now="productInfo.nowDate" :target="productInfo.intentEndDate" @end="orderEnd = true"></count-down>结束
          </template>
          <template v-else>
            距离<count-down :now="productInfo.nowDate" :target="productInfo.intentStartDate" @end="toStart"></count-down>开始
          </template>
        </div>
        <div class="btn theme-btn full" @click="order" v-if="orderStart">一键预约</div>
        <div class="btn theme-btn full gray-btn" v-else>一键预约</div>
      </div>
    </template>
    <!-- 预约结束 -->
    <template v-else>
      <order-end></order-end>
    </template>
  </div>
</template>
<script>
import productLevel from './components/productLevel'
import productNotice from './components/productNotice'
import productPoint from './components/productPoint'
import activityRule from './components/activityRule'
import colleagueOrdered from './components/colleagueOrdered'
import allOrdered from './components/allOrdered'
import orderEnd from './components/orderEnd'
import countDown from '../../components/countDown'
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import { MessageBox } from 'mint-ui'
import tShare from 'mixins/tShare'
export default {
  mixins: [tShare],
  data () {
    return {
      query: {},
      productInfo: {
        markList: [],
        intentNum: 0,
        productTerm: 0,
        nowDate: 0,
        intentStartDate: 0,
        intentEndDate: 0,
        subscribeStartDate: 0,
        subscribeEndDate: 0,
        show: -1
      },
      orderStart: false,
      orderEnd: false
    }
  },
  created () {
    helper.title('同事理财团')
    this.query = getPageQueryObject()
    this.getProductInfo()
  },
  methods: {
    async getProductInfo () {
      let res = await this.$Tfinance.product(this.query)
      this.productInfo = res.data
      helper.saveShareInfo({fxId: this.productInfo.wechatId})
      helper.saveTFinanceInfo(this.productInfo)
      this.shareConfig()
      this.showDataByStatus()
    },
    showDataByStatus () {
      let { intentStatus, nowDate, intentStartDate, intentEndDate } = this.productInfo
      this.orderStart = nowDate >= intentStartDate
      this.orderEnd = nowDate >= intentEndDate
      if (!this.checkFollowAndBind()) return
      if (intentStatus === 1) {
        this.$router.replace({ name: 'tfinanceResult' })
      }
    },
    checkFollowAndBind () {
      let { followStatus, bindStatus } = this.productInfo
      if (followStatus === 0) {
        MessageBox('提示', '发现您尚未关注【放薪管家】公众号，请关注后再进行预约！')
        return false
      }
      if (bindStatus === 0) {
        MessageBox({
          message: '您尚未通过放薪管家工资条认证，请先完成认证后再进行预约！',
          confirmButtonText: '去认证',
          showCancelButton: true
        }).then(action => {
          action === 'confirm' && this.$router.push({ name: 'bindIdCard' })
        })
        return false
      }
      return true
    },
    toStart () {
      this.productInfo.nowDate = this.productInfo.intentStartDate
      this.orderStart = true
    },
    order () {
      if (this.checkFollowAndBind()) {
        this.$router.push({name: 'tfinanceConfirm'})
      }
    }
  },
  components: {
    productLevel,
    productNotice,
    productPoint,
    activityRule,
    colleagueOrdered,
    allOrdered,
    orderEnd,
    countDown
  }
}
</script>
