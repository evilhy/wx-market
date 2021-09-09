<template>
  <div class="welfare-list-page page">
    <no-data text="暂无福利活动" name="activity" v-if="request && list.length < 1"></no-data>
    <van-list v-else v-model="loading" :finished="finished" :finished-text="finishedText" @load="getList">
      <welfare-item v-for="(item, index) in list" :key="index" :item="item"></welfare-item>
    </van-list>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import welfareItem from './components/welfareItem'

export default {
  data() {
    return {
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
      let res = await this.$WelfareActivity.activityList(this.page)
      let { content = [], last = false } = res.data
      this.list = this.list.concat(content)
      this.finished = last
      this.page++
      this.request = true
      this.loading = false
    }
  },
  components: {
    welfareItem,
    noData
  }
}
</script>
