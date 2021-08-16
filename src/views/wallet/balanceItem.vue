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
    <template v-if="showWithdraw">
      <div class="line mb-20 mt-10"></div>
      <!-- 账户异常 -->
      <div class="error-text" v-if="item.accountStatus === 1">付款账户异常，暂时无法提现</div>
      <template v-else>
        <div class="error-text" v-if="item.withdrawalStatus === 4">超过提现有效期，资金被撤回</div>
        <template v-else>
          <!-- 自动转到银行卡 -->
          <div class="theme-text" v-if="item.dealType === 0">提现有效期截止{{item.cutoffTime | date('Y年m月d日H时i分s秒')}}</div>
          <!-- 到期撤回 -->
          <div class="theme-text" v-else>提现有效期仅剩<count-down class="error-text" :now="item.systemTime" :target="item.cutoffTime" @end="countEnd"></count-down></div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import helper from 'utils/helper'
import WithdrawTag from './withdrawTag.vue'
import CountDown from 'components/countDown'
export default {
  name: '',
  components: { WithdrawTag, CountDown },
  props: {
    item: Object
  },
  data() {
    return {
    }
  },
  computed: {
    showWithdraw () {
      // withdrawStatus: 是否启用员工提现（0.停用 1.启用） withdrawalStatus: 提现状态： 0待提现 1提现成功 2提现失败 3处理中 4提现超时
      let { withdrawalStatus, withdrawStatus } = this.item
      return (withdrawalStatus === 0 || withdrawalStatus === 2 || withdrawalStatus === 4) && withdrawStatus === 1
    },
    canWithdraw () {
      // accountStatus: 0账户正常 1账户异常
      let { accountStatus, transAmount, withdrawalStatus } = this.item
      return accountStatus === 0 && transAmount > 0 && withdrawalStatus !== 4
    }
  },
  created() {},
  mounted() {},
  methods: {
    countEnd () {
      this.item.withdrawalStatus = 4
      this.item.withdrawalStatusVal = '超时未提现'
    },
    toPage (name) {
      if (name === 'withdrawalConfirm') {
        helper.saveWithdrawDetail(this.item)
      }
      this.$router.push({ name, params: { id: this.item.withdrawalLedgerId } })
    }
  }
}
</script>
