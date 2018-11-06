<template>
  <div class="result-product-wrap white-box">
    <div class="line-title">{{productInfo.productName}}<tag :content="tagContent"
           :color="tagColor"></tag>
    </div>
    <div class="rate-wrap">
      <span class="label">预期收益率(%)</span>
      <span class="value"
            v-if="productInfo.markList && productInfo.markList.length">{{productInfo.markList[0].levelRate}}%<span class="stress"
              v-if="addedRate > 0">+{{addedRate}}</span></span>
    </div>
    <div class="limit-info">
      <p class="days"><span class="label">产品期限(天)</span><span class="value">&nbsp;&nbsp;{{productInfo.productTerm}}</span></p>
      <p class="money"><span class="label">最低起购(元)</span><span class="value">&nbsp;&nbsp;{{productInfo.minIntentAmt | money}}</span></p>
    </div>
  </div>
</template>
<script>
import tag from './tag'
import collect from 'utils/collect'
export default {
  props: {
    term: {
      type: Number,
      default: 1
    },
    status: {
      type: Number,
      default: 1   // 1.预约成功 2.认购成功
    },
    productInfo: {
      type: Object,
      default () {
        return {
          productName: '',
          markList: [],
          minIntentAmt: 0,
          productTerm: 0
        }
      }
    }
  },
  data () {
    return {
      currentIndex: 0,
      addedRate: 0,
      tagContent: '',
      tagColor: ''
    }
  },
  watch: {
    productInfo (val) {
      this.calData()
    },
    term (val) {
      this.calStatus(val)
    }
  },
  methods: {
    calData () {
      let { markList, nowMark } = this.productInfo
      this.currentIndex = collect.indexOf(markList, 'markLevel', nowMark)
      this.addedRate = markList[this.currentIndex].levelRate - markList[0].levelRate
    },
    calStatus (term) {
      this.$nextTick(() => {
        switch (term) {
          case 0:
          case 1:
            this.tagContent = '已预约'
            this.tagColor = 'green'
            break
          case 2:
            this.tagContent = '待认购'
            this.tagColor = 'orange'
            break
          case 3:
          case 4:
          case 5:
            this.tagContent = this.status === 1 ? '未认购' : '已认购'
            this.tagColor = this.status === 2 ? 'red' : 'green'
            break
        }
      })
    }
  },
  components: {
    tag
  }
}
</script>