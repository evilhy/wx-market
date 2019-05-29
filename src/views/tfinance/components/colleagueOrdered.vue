<template>
  <div class="colleague-ordered-wrap">
    <van-list class="white-box" :class="{'no-pad': totalElements <=0}" v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished"
      finished-text="" @load="getList">
      <div class="title-wrap" v-if="totalElements !== -1">
        <dot-line direction="left"></dot-line>
        <span class="title" v-if="type==='part'">您公司这些小伙伴在关注该产品</span>
        <span class="title" v-else>您公司有{{totalElements}}位小伙伴预约了该产品</span>
        <dot-line direction="right"></dot-line>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index">
          <avator size="small" :border="false" :src="item.headimgurl"></avator>
          <p class="text"><span class="name">{{item.nickname}}</span>
            <span class="action" v-if="item.operate === 0">查看</span><span class="stress action" v-else>预约</span>了该产品</p>
          <span class="relative-time">{{item.crtDateTime | pastTime(item.nowDate)}}</span>
        </div>
      </div>
    </van-list>
    <p class="tip" v-if="type=== 'part' && totalElements > 20">-- 仅展示前20条 --</p>
    <p class="tip" v-if="type=== 'all' && totalElements > 20 && totalElements === list.length">-- 已经到底了 --</p>
  </div>
</template>
<script>
import dotLine from './dotLine'
import avator from './avator'
export default {
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      list: [],
      currentPage: 1,
      totalPages: 0,
      totalElements: -1,
      loading: false,
      finished: false,
      error: false
    }
  },
  created () {
  },
  methods: {
    async getList () {
      try {
        let operate = this.type === 'all' ? 1 : -1
        let res = await this.$Tfinance.operateList(this.currentPage, operate)
        let { responeList = [], totalElements = -1, totalPages = 0 } = res.data
        this.list = this.list.concat(responeList)
        this.totalElements = totalElements
        this.totalPages = totalPages
        this.loading = false
        if (this.type === 'part') {
          this.finished = true
        } else {
          if (totalPages && this.currentPage < totalPages) {
            this.currentPage++
          } else {
            this.finished = true
          }
        }
      } catch (e) {
        this.loading = false
        this.error = true
      }

    }
  },
  components: {
    dotLine,
    avator
  }
}
</script>