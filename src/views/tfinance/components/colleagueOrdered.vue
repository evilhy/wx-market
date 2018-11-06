<template>
  <div class="colleague-ordered-wrap" v-if="totalPages">
    <div class="white-box">
      <div class="title-wrap">
        <dot-line direction="left"></dot-line>
        <span class="title" v-if="type==='part'">您公司这些小伙伴在关注该产品</span>
        <span class="title" v-else>您公司共有{{totalElements}}位小伙伴预约了这款产品</span>
        <dot-line direction="right"></dot-line>
      </div>
      <div class="list" v-infinite-scroll="getList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="item" v-for="(item, index) in list" :key="index">
          <avator size="small" :border="false" :src="item.headimgurl"></avator>
          <p class="text"><span class="name">{{item.nickname}}</span>
          <span class="action" v-if="item.operate === 0">查看</span><span class="stress action" v-else>预约</span>了该产品</p>
          <span class="relative-time">{{item.crtDateTime | pastTime(item.nowDate)}}</span>
        </div>
      </div>
    </div>
    <p class="tip" v-if="type=== 'part' && totalElements > 20">-- 仅展示前20条 --</p>
  </div>
</template>
<script>
import dotLine from './dotLine'
import avator from './avator'
export default {
  props: {
    productId: String,
    entId: String,
    type: {
      type: String,
      default: 'all'
    }
  },
  data () {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      loading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.loading = true
      let res = await this.$Tfinance.operateList(this.productId, this.entId, this.currentPage)
      this.list = this.list.concat(res.data.responeList)
      this.totalElements = res.data.totalElements
      this.totalPages = res.data.totalPages
      if (this.totalPages !== 0 && this.currentPage < this.totalPages && this.type === 'all') {
        this.currentPage ++
        this.loading = false
      }
    }
  },
  components: {
    dotLine,
    avator
  }
}
</script>