<template>
  <div class="goods-list-page page">
    <no-data text="暂无商品" name="goods" v-if="request && list.length < 1"></no-data>
    <van-list v-else v-model:loading="loading" :finished="finished" :finished-text="finishedText" @load="getList">
      <goods-item v-for="(item, index) in list" :key="index" :item="item"></goods-item>
    </van-list>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import goodsItem from './components/goodsItem'

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
      const res = await this.$WelfareGoods.goodsList(this.activityId, this.page)
      const { content = [], last = false } = res.data
      this.list = this.list.concat(content)
      this.finished = last
      this.page++
      this.request = true
      this.loading = false
    }
  },
  components: {
    goodsItem,
    noData
  }
}
</script>
