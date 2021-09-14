<template>
  <div class="exchange-page">
    <no-data text="暂无兑换记录" v-if="request && list.length < 1"></no-data>
    <van-list v-else v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList">
      <order-item v-for="(item, index) in list" :key="index" :order-info="item"></order-item>
    </van-list>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import orderItem from './components/orderItem'

export default {
  data() {
    return {
      activityId: this.$route.params.activityId,
      list: [],
      page: 1,
      loading: false,
      finished: false,
      request: false,
      finishedText: sysConfig.listFinishedText
    }
  },
  created() {},
  methods: {
    async getList() {
      this.loading = true
      let res = await this.$WelfareCust.orderList(this.activityId, this.page)
      let { content = [], last = false } = res.data
      this.list = this.list.concat(content)
      this.finished = last
      this.page++
      this.request = true
      this.loading = false
    }
  },
  components: { orderItem, noData }
}
</script>
