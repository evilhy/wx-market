<template>
  <div class="exchange-page">
    <no-data text="空空如也，没有兑换记录哦！" type="exchange" v-if="request && !list.length"></no-data>
    <van-list v-else v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList">
      <order-item v-for="(item, index) in list" :key="index" :order-info="item"></order-item>
    </van-list>
  </div>
</template>

<script>
import orderItem from './components/orderItem'
import noData from 'components/noData'
import sysConfig from 'utils/constant'

export default {
  data () {
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
  created () {
  },
  methods: {
    async getList () {
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
