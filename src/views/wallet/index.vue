<template>
  <div class="page wallet-page">
    <div class="white-box">
      <wallet type="inner"></wallet>
      <!-- 筛选 -->
      <wallet-filter ref="walletFilterRef" @search="search"></wallet-filter>
    </div>
    <!-- 资金列表 -->
    <no-data v-if="total === 0"></no-data>
    <van-list v-else v-model:loading="loading"
      :finished="finished" :finished-text="finishedText" @load="getList">
      <div class="month-list" v-for="data in listData" :key="data.yearMonth">
        <div class="flow-month">
          {{ Number(data.yearMonth.slice(0, 4)) === new Date().getFullYear() ? '' : data.yearMonth.slice(0, 4) + '年' }}{{ data.yearMonth.slice(4) }}月
        </div>
        <wage-flow-item v-for="(item, index) in data.list" :key="index"
          :item="item"></wage-flow-item>
      </div>
    </van-list>
  </div>
</template>

<script>
import noData from 'components/noData/index'
import sysConfig from 'utils/constant'
import decryptInfo from 'utils/decryptInfo'
import { ref } from 'vue'
import Wallet from 'apis/wallet.js'
import wageFlowItem from './wageFlowItem.vue'
import walletFilter from './walletFilter.vue'
import wallet from './wallet'

export default {
  setup() {
    // data
    const walletFilterRef = ref(null)
    let listInfo = ref({})
    let listData = ref([])
    let page = ref(1)
    let loading = ref(false)
    let finished = ref(false)
    let total = ref(-1)
    const finishedText = sysConfig.listFinishedText
    // methods
    const getList = async (query) => {
      loading.value = true
      if (!query) {
        query = walletFilterRef ? walletFilterRef.searchData : {}
      }
      let res = await Wallet.withdrawalLedgerPage(query, page.value)
      let { content = [], last = false, totalElements = 0, totalPages } = res.data
      content = decryptInfo(content, 'walletNumber', 'transAmount', 'custName', 'idNumber', 'account', 'employeeCardNo')
      content.forEach((item) => {
        let { year, month } = item
        let yearMonth = year.toString() + month.toString()
        if (!listInfo.value[yearMonth]) {
          listInfo.value[yearMonth] = []
          listData.value.push({ yearMonth, list: [] })
        }
        listInfo.value[yearMonth].push(item)
        listData.value[listData.value.length - 1].list.push(item)
      })
      total.value = totalElements
      finished.value = last || page.value === totalPages
      page.value += 1
      loading.value = false
    }

    const search = (query = {}) => {
      listInfo.value = {}
      listData.value = []
      finished.value = false
      page.value = 1
      total.value = -1
      getList(query)
    }
    return {
      walletFilterRef,
      listInfo,
      listData,
      page,
      loading,
      finished,
      total,
      finishedText,
      getList,
      search
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
