<template>
  <div class="all-ordered-wrap">
    <div class="white-box">
      <div class="top">
        <span class="title">平台实时预约</span>
        <span class="num">已有<span class="black">{{intentNum >= size ? intentNum * 3 : intentNum}}</span>人预约</span>
      </div>
      <table><th><td>姓名</td><td>预约额度(元)</td><td>预期收益(元)</td><td>预约时间</td></th>
        <tr v-for="(item, index) in list" :key="index"><td>{{$filter.nameStar(item.clientName) }}</td><td>{{$filter.money(item.intentAmount)}}</td><td>{{ $filter.money(item.profit)}}</td><td>{{item.crtDateTime | $filter.pastTime(nowDate)}}</td></tr>
      </table>
    </div>
    <p class="tip" v-if="intentNum > size">-- 仅展示前{{size}}条 --</p>
  </div>
</template>
<script>
export default {
  props: {
    productId: String
  },
  data () {
    return {
      list: [],
      intentNum: 0,
      size: 0,
      nowDate: new Date().getTime()
    }
  },
  created () {
    this.getOrderedList()
  },
  methods: {
    async getOrderedList () {
      let res = await this.$Tfinance.intentionList(this.productId)
      this.list = res.data.list
      this.intentNum = res.data.intentNum
      this.size = res.data.size
      this.nowDate = res.data.nowDate
    }
  }
}
</script>
