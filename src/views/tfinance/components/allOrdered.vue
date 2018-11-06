<template>
  <div class="all-ordered-wrap white-box">
    <div class="top">
      <span class="title">实时预约</span>
      <span class="num">已有<span class="black">{{intentNum}}</span>人预约完成</span>
    </div>
    <table><th><td>姓名</td><td>预约额度(元)</td><td>到期收益(元)</td><td>预约时间</td></th>
      <tr v-for="(item, index) in list" :key="index"><td>{{item.clientName | nameStar}}</td><td>{{item.intentAmount| money}}</td><td>{{item.profit | money}}</td><td>{{item.crtDateTime | pastTime(nowDate)}}</td></tr>
    </table>
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
      this.nowDate = res.data.nowDate
    }
  }
}
</script>
