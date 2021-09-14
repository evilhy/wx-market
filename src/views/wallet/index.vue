<template>
  <div class="page wallet-page">
    <div class="white-box">
      <wallet type="inner"></wallet>
      <!-- 筛选 -->
      <wallet-filter ref="wallet-filter" @search="search"></wallet-filter>
    </div>
    <!-- 资金列表 -->
    <no-data v-if="totalElements === 0"></no-data>
    <van-list v-else v-model="loading" :immediate-check="false" :finished="finished" :finished-text="finishedText" @load="getList">
      <div class="month-list" v-for="data in listData" :key="data.yearMonth">
        <div class="flow-month">{{ Number(data.yearMonth.slice(0, 4)) === new Date().getFullYear() ? '' : data.yearMonth.slice(0, 4) + '年' }}{{ data.yearMonth.slice(4) }}月</div>
        <wage-flow-item v-for="(item, index) in data.list" :key="index" :item="item"></wage-flow-item>
      </div>
    </van-list>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import decryptInfo from 'utils/decryptInfo'
import wageFlowItem from './wageFlowItem.vue'
import walletFilter from './walletFilter.vue'
import wallet from './wallet'

export default {
  data() {
    return {
      listInfo: {},
      listData: [],
      page: 1,
      loading: false,
      finished: false,
      totalElements: -1,
      finishedText: sysConfig.listFinishedText
    }
  },
  created() {},
  methods: {
    async getList(query) {
      this.loading = true
      if (!query) {
        query = this.$refs['wallet-filter'] ? this.$refs['wallet-filter'].searchData : {}
      }
      let res = await this.$Wallet.withdrawalLedgerPage(query, this.page)
      let { content = [], last = false, totalElements = 0, totalPages } = res.data
      content = decryptInfo(content, 'walletNumber', 'transAmount', 'custName', 'idNumber', 'account', 'employeeCardNo')
      content.forEach((item) => {
        let { year, month } = item
        let yearMonth = year.toString() + month.toString()
        if (!this.listInfo[yearMonth]) {
          this.$set(this.listInfo, yearMonth, [])
          this.listData.push({ yearMonth, list: [] })
        }
        this.listInfo[yearMonth].push(item)
        this.listData[this.listData.length - 1].list.push(item)
      })
      this.totalElements = totalElements
      this.finished = last || this.page === totalPages
      this.page++
      this.loading = false
    },
    search(query = {}) {
      this.$set(this, 'listInfo', {})
      this.$set(this, 'listData', [])
      this.finished = false
      this.page = 1
      this.totalElements = -1
      this.getList(query)
    }
  },
  components: {
    wallet,
    walletFilter,
    wageFlowItem,
    noData
  }
}
</script>
