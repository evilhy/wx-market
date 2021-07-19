<template>
  <div class="balance-item">
    <div class="balance-item__title" @click="toPage('withdrawalDetail')"><span class="van-ellipsis">{{item.wageSheetName}}</span>
      <van-icon name="arrow" />
    </div>
    <div class="balance-item__value">¥ {{item.transAmount | money}}<withdraw-tag :status="item.withdrawalStatus" :desc="item.withdrawalStatusVal"></withdraw-tag>
    </div>
    <div class="balance-item__footer ">
      <span><span class="gray-text">付款账户：</span>{{item.accountOpenBank}}({{item.account.slice(-4)}}）</span><span
        class="gray-text">发放时间：{{item.issueTime | date('Y/m/d h:i:s')}}</span>
    </div>
    <van-button v-if="showWithdraw" class="balance-item__action" round type="primary" size="small" :disabled="!canWithdraw" @click="toPage('withdrawalConfirm')">提现</van-button>
    <template v-if="item.accountStatus === 1 && showWithdraw">
      <div class="line mb-20 mt-10"></div>
      <div class="error-text">付款账户异常，暂时无法提现</div>
    </template>
  </div>
</template>

<script>
import helper from 'utils/helper'
import WithdrawTag from './withdrawTag.vue'
export default {
  name: '',
  components: { WithdrawTag },
  props: {
    item: Object
  },
  data() {
    return {
    }
  },
  computed: {
    showWithdraw () {
      // 是否启用员工提现（0.停用 1.启用）
      let { withdrawalStatus, withdrawStatus } = this.item
      return (withdrawalStatus === 0 || withdrawalStatus === 2) && withdrawStatus === 1
    },
    canWithdraw () {
      let { accountStatus, transAmount } = this.item
      return accountStatus === 0 && transAmount > 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    toPage (name) {
      if (name === 'withdrawalConfirm') {
        helper.saveWithdrawDetail(this.item)
      }
      this.$router.push({ name, params: { id: this.item.withdrawalLedgerId } })
    }
  }
}
</script>
