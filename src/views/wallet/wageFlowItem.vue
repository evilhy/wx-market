<template>
  <div class="wage-flow-item" @click="toDetail">
    <div class="wage-flow-item__top">
      <div class="wage-flow-item__title">{{ item.wageSheetName }}</div>
      <div class="wage-flow-item__money">+{{ item.transAmount | money }}</div>
    </div>
    <div class="wage-flow-item__bottom">
      <div class="wage-flow-item__date">{{ item.issueTime | date('Y/m/d h:i:s') }}</div>
      <div class="wage-flow-item__status">
        <withdraw-tag :status="item.withdrawalStatus" :desc="item.withdrawalStatusVal"></withdraw-tag>
      </div>
    </div>
    <van-icon class="center-arrow" name="arrow" />
  </div>
</template>

<script>
import WithdrawTag from './withdrawTag.vue'

export default {
  name: 'wageFlowItem',
  components: {
    WithdrawTag
  },
  props: {
    item: Object
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    toDetail() {
      this.$router.push({ name: 'withdrawalDetail', params: { id: this.item.withdrawalLedgerId } })
    }
  }
}
</script>
