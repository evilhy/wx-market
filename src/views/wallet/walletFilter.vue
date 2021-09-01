<template>
  <div class="wallet-filter-wrap">
    <van-sticky>
      <div class="filter-wrap">
        <div class="filter-date-bar">
          <van-button round size="mini" @click="yearShow = true">
            {{year}}<span class="triangle"></span></van-button>
          <van-button round size="mini" @click="monthShow = true">
            {{month}}{{month ? '月' : '全部'}}<span class="triangle"></span>
          </van-button>
        </div>
        <van-dropdown-menu>
          <van-dropdown-item ref="item">
            <span slot="title"><img src="../../assets/img/icon-filter.png"
                alt=""></span>
            <van-button v-for="(item, index) in statusList" :key="item.value"
              :class="{active: status === item.value}" round size="small"
              @click="selectStatus(item)">{{item.text}}
            </van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <van-action-sheet v-model="yearShow" :actions="yearList"
      close-on-click-action close-on-popstate @select="selectYear" />
    <van-action-sheet v-model="monthShow" :actions="monthList"
      close-on-click-action close-on-popstate @select="selectMonth" />
  </div>
</template>

<script>
import { getHistoryYearList, getHistoryMonthList } from 'utils/assist'
export default {
  name: 'WalletFilter',
  components: {},
  data() {
    return {
      year: new Date().getFullYear(),
      month: '',
      status: '',
      yearList: getHistoryYearList(2020, 'name'),
      monthList: getHistoryMonthList(new Date().getFullYear(), 'name'),
      statusList: [],
      yearShow: false,
      monthShow: false
    }
  },
  computed: {
    searchData () {
      let { year, month, status } = this
      return { year, month, withdrawalStatus: typeof status === 'number' ? [status] : [] }
    }
  },
  created() {
    this.getStatusList()
    this.search()
  },
  mounted() {},
  methods: {
    async getStatusList() {
      let res = await this.$Select.WithdrawalStatusEnum()
      this.statusList = [{ value: '', text: '全部' }].concat(
        res.data.map(({ code, desc } = {}) => ({ value: code, text: desc }))
      )
    },
    selectYear(item, index) {
      this.year = parseInt(item.name)
      this.$set(this, 'monthList', getHistoryMonthList(item.name, 'name'))
      this.search()
    },
    selectMonth(item, index) {
      this.month = this.isSingleMonth(item.name) ? parseInt(item.name) : ''
      this.search()
    },
    selectStatus(item) {
      this.status = item.value
      this.$refs.item.toggle()
      this.search()
    },
    isSingleMonth(month) {
      return !isNaN(parseInt(month))
    },
    search () {
      return this.$emit('search', this.searchData)
    }
  }
}
</script>
