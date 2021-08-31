<template>
  <div class="page withdrawal-detail-page">
    <div class="withdrawal-outline">
      <div class="withdrawal-outline__value mb-10">￥{{wageDetail.transAmount | money}}</div>
      <div v-if="wageDetail.withdrawalStatus > -1" class="withdrawal-outline__tatus mb-30" :class="wageDescList[wageDetail.withdrawalStatus].className">{{wageDescList[wageDetail.withdrawalStatus].text}}</div>
    </div>
    <div class="line"></div>
    <template v-if="wageDetail.withdrawalStatus === 1 || wageDetail.withdrawalStatus === 2 || wageDetail.withdrawalStatus === 3">
      <withdrawal-steps :info="wageProgress"></withdrawal-steps>
      <div class="line"></div>
    </template>
    <div class="row-flex-wrap">
      <div class="row-flex row-flex--between"><span
          class="label">方案名称</span><span class="value">{{wageDetail.wageSheetName}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">资金类型</span><span class="value">{{wageDetail.fundTypeVal}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">付款方</span><span class="value">{{wageDetail.accountName}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">付款帐号</span><span class="value">{{wageDetail.accountOpenBank}}（尾号{{wageDetail.account.slice(-4)}}）</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">收款方</span><span class="value">{{wageDetail.custName}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">收款账号</span><span class="value">放薪钱包（尾号{{wageDetail.walletNumber.slice(-4)}}）</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">发放时间</span><span class="value">{{wageDetail.issueTime | date('Y/m/d h:i:s')}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">交易编号</span><span class="value">{{wageDetail.transNo}}</span></div>
      <div class="row-flex row-flex--between"><span
          class="label">备注</span><span class="value">{{wageDetail.remark}}</span></div>
    </div>
    <div class="fixed-btn-wrap">
      <van-button :class="showWithdraw ? 'short-btn' : 'long-btn'" plain type="primary" @click="$router.go(-1)">返回</van-button>
      <van-button v-if="showWithdraw" type="primary" :disabled="!canWithdraw" @click="toWithdraw">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import withdrawalSteps from './withdrawalSteps.vue'
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'

export default {
  name: '',
  components: { withdrawalSteps },
  data() {
    return {
      id: this.$route.params.id,
      wageDetail: {
        withdrawalStatus: -1,
        account: '',
        walletNumber: ''
      },
      wageProgress: {},
      loading: false,
      wageDescList: [ // 0:待提现、1:提现成功、2:提现失败、3:处理中 4:超时未提现
        {
          className: 'gray-text',
          text: '钱包收款'
        },
        {
          className: 'success-text',
          text: '提现成功'
        },
        {
          className: 'error-text',
          text: '提现失败'
        },
        {
          className: 'warning-text',
          text: '处理中'
        },
        {
          className: 'error-text',
          text: '超时未提现'
        }
      ]
    }
  },
  computed: {
    showWithdraw () {
      // 是否启用员工提现（0.停用 1.启用）
      let { withdrawalStatus, withdrawStatus } = this.wageDetail
      return (withdrawalStatus === 0 || withdrawalStatus === 2) && withdrawStatus === 1
    },
    canWithdraw () {
      // 付款账户状态(0:正常、1:异常)
      let { accountStatus, transAmount } = this.wageDetail
      return accountStatus === 0 && transAmount > 0
    },
    btnText () {
      let { withdrawalStatus } = this.wageDetail
      return withdrawalStatus === 0 ? '提现' : '重新发起提现'
    }
  },
  created() {
    helper.title('资金详情')
    this.getDetail()
  },
  mounted() {},
  methods: {
    async getDetail() {
      try {
        this.loading = true
        let res = await this.$Wallet.withdrawalRecordDetail(this.id)
        let { withdrawalRecordLog = {}, withdrawalLedgerDetail = {} } = res.data
        this.wageDetail = decryptInfo(withdrawalLedgerDetail, 'walletNumber', 'transAmount', 'idNumber', 'employeeCardNo', 'custName', 'account')
        this.wageProgress = decryptInfo(withdrawalRecordLog, 'custName', 'transAmount', 'employeeCardNo')
      } finally {
        this.loading = false
      }
    },
    async toWithdraw () {
      helper.saveWithdrawDetail(this.wageDetail)
      this.$router.push({ name: 'withdrawalConfirm', params: { id: this.id } })
    }
  }
}
</script>
