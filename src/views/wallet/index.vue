<template>
  <div class="page wallet-page">
    <div class="white-box">
      <wallet type="inner"></wallet>
      <!-- 筛选 -->
      <van-sticky>
        <div class="filter-wrap">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" />
          </van-dropdown-menu>
          <div class="date" @click="calendarShow = true">
            <template v-if="startDate && endDate">
              {{startDate | date('Y-m-d')}} ~ {{endDate | date('Y-m-d')}}
            </template>
            <img src="../../assets/img/icon-wallet-date.png" alt="">
          </div>
        </div>
      </van-sticky>
    </div>
    <no-data></no-data>
    <van-calendar v-model="calendarShow" type="range" @confirm="onConfirm" />
  </div>
</template>

<script>
import wallet from 'components/wallet'
import noData from 'components/noData/index'
export default {
  data () {
    return {
      calendarShow: false,
      startDate: null,
      endDate: null,
      value: 0,
      option: [
        { text: '全部', value: 0 },
        { text: '收款', value: 1 },
        { text: '提现', value: 2 }
      ]
    }
  },
  created () { },
  methods: {
    onConfirm (dataArr = []) {
      this.calendarShow = false
      this.startDate = dataArr[0] || ''
      this.endDate = dataArr[1] || ''
    }
  },
  components: {
    wallet,
    noData
  }
}
</script>