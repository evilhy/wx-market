<template>
  <div class="page balance-list-page">
    <div class="balance-outline">
      <div class="balance-value">￥{{ balanceInfo.availableAmount | money }}</div>
      <div class="balance-desc mb-20">可提现额度</div>
      <template v-if="totalElements > 0 && list[0].bankClose">
        <div class="line"></div>
        <div class="balance-tip warning-text" mt15>22:00～24:00为银行通道维护时间，提现金额将在系统维护结束后到账</div>
      </template>
    </div>
    <no-data v-if="totalElements === 0"></no-data>
    <van-list v-else v-model="loading" :immediate-check="false" :finished="finished" :finished-text="finishedText" @load="getList">
      <balance-item v-for="(item, index) in list" :key="index" :item="item"></balance-item>
    </van-list>
  </div>
</template>

<script>
import sysConfig from 'utils/constant'
import decryptInfo from 'utils/decryptInfo'
import balanceItem from './balanceItem'

export default {
  name: '',
  components: {
    balanceItem
  },
  data() {
    return {
      balanceInfo: {},
      list: [],
      page: 1,
      loading: false,
      finished: false,
      totalElements: -1,
      finishedText: sysConfig.listFinishedText
    }
  },
  created() {
    this.getBalance()
    this.getList()
  },
  mounted() {},
  methods: {
    async getBalance() {
      let res = await this.$Wallet.getBalance()
      this.balanceInfo = decryptInfo(res.data, 'availableAmount')
    },
    async getList() {
      this.loading = true
      let res = await this.$Wallet.withdrawalLedgerPage({ withdrawalStatus: [0, 2, 3] }, this.page)
      let { content = [], last = false, totalElements = 0, totalPages } = res.data
      content = decryptInfo(content, 'walletNumber', 'transAmount', 'custName', 'idNumber', 'account', 'employeeCardNo')
      this.list = this.list.concat(content)
      this.totalElements = totalElements
      this.finished = last || this.page === totalPages
      this.page++
      this.loading = false
    }
  }
}
</script>
