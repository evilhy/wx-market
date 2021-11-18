<template>
  <li @click="toWage">
    <div class="bill-date">{{ $filter.date(wage.createDateTime, 'm.d') }}</div>
    <div class="bill-main">
      <div class="item_before"></div>
      <div class="bill-left">
        <div class="bill-type" center-v>
          <svg-icon :svg-name="typeIcon[wage.spTypeIcon]" fill="#333"></svg-icon>
          <span>{{ wage.fundType }}</span><span v-if="wage.fundDateDesc">({{ wage.fundDateDesc }})</span>
        </div>
        <p class="bill-name">{{ wage.spName }}</p>
      </div>
      <div class="bill-right">
        <div class="bill-amt">
          <i v-show="flag">&yen;</i>
          <span v-show="flag">{{ $filter.money(wage.totalAmt) }}</span>
          <span class="star" v-show="!flag">****</span>
        </div>
        <div class="bill-status error" v-if="wage.payStatus === '0'">资金未到账</div>
        <div class="bill-status success" v-if="wage.payStatus === '1'">资金已到账</div>
        <div class="bill-status success" v-if="wage.payStatus === '2'">{{ wage.payCnt }}笔资金到账</div>
      </div>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    flag: {
      type: Boolean
    },
    wage: {
      type: Object
    }
  },
  data() {
    return {
      typeIcon: {
        0: 'wage',
        1: 'bonus',
        2: 'guarantee',
        3: 'more'
      }
    }
  },
  methods: {
    toWage() {
      this.$router.push({ name: 'wageIndex', params: { wageSheetId: this.wage.wageSheetId } })
    }
  }
}
</script>
