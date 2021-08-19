<template>
  <div class="page withdrawal-confirm-page">
    <template v-if="step === 1">
      <div class="title-gray">资金详情</div>
      <div class="row-flex-wrap">
        <div class="row-flex row-flex--between"><span
            class="label">方案名称</span><span
            class="value">{{wageDetail.wageSheetName}}</span></div>
        <div class="row-flex row-flex--between"><span
            class="label">资金月份</span><span
            class="value">{{wageDetail.fundDateVal}}</span></div>
        <div class="row-flex row-flex--between"><span
            class="label">资金类型</span><span
            class="value">{{wageDetail.fundTypeVal}}</span></div>
        <div class="row-flex row-flex--between"><span
            class="label">发放机构</span><span
            class="value">{{wageDetail.groupName}}</span></div>
      </div>
      <div class="title-gray">提现金额</div>
      <div class="balance-outline">
        <div class="balance-value">￥{{wageDetail.transAmount | money}}</div>
        <div class="balance-desc mb-20">大写金额：<span
            class="warning-text">{{wageDetail.transAmount | numberToChinese}}</span>
        </div>
      </div>
      <div class="title-gray">提现收款账户</div>
      <div class="wage-flow-item" @click="show = true">
        <div class="wage-flow-item__top">
          <div class="wage-flow-item__title">{{selectedBank.name}}</div>
        </div>
        <div class="wage-flow-item__bottom">
          <div class="wage-flow-item__date">{{selectedBank.subname}}</div>
        </div>
        <van-icon class="center-arrow" name="arrow" />
      </div>
      <div class="fixed-btn-wrap">
        <van-button class="short-btn" plain type="primary"
          @click="$router.go(-1)">返回</van-button>
        <van-button type="primary" :disabled="btnDisabled" @click="step = 2">确认提现</van-button>
      </div>
      <van-action-sheet v-model="show" :actions="banks" close-on-popstate
        close-on-click-action @select="onSelect" />
    </template>
    <template v-else>
      <login-by-pwd :is-page="false" @next="sure"></login-by-pwd>
    </template>
  </div>
</template>

<script>
import decryptInfo from 'utils/decryptInfo'
import helper from 'utils/helper'
import loginByPwd from '../pwd/loginByPwd.vue'
export default {
  name: '',
  components: { loginByPwd },
  data() {
    return {
      id: this.$route.params.id,
      step: 1,
      loading: false,
      show: false,
      banks: [],
      selectedBank: {},
      wageDetail: helper.getWithdrawDetail()
    }
  },
  computed: {
    btnDisabled() {
      return (
        this.loading ||
        !this.wageDetail.transAmount ||
        !Object.keys(this.selectedBank).length
      )
    }
  },
  created() {
    helper.title('余额提现')
    this.getCardList()
  },
  mounted() {},
  methods: {
    async getCardList() {
      try {
        this.loading = true
        let res = await this.$Roll.empCard()
        this.banks = this.transBanks(decryptInfo(res.data, 'cardNo'))
        if (this.banks.length) {
          this.selectedBank = this.banks[0]
        }
      } finally {
        this.loading = false
      }
    },
    transBanks(list = []) {
      return list.map((item) => {
        let { issuerName, cardNo, cardTypeVal } = item
        return {
          ...item,
          name: `${issuerName}（尾号${cardNo.slice(-4)}）`,
          subname: `卡片类型：${cardTypeVal}`
        }
      })
    },
    onSelect(item = {}) {
      this.selectedBank = item
    },
    async sure () {
      try {
        this.loading = true
        await this.$Wallet.withdraw({ withdrawalLedgerId: this.id, cardNo: this.selectedBank.cardNo })
        this.$router.go(-1)
      } catch (e) {
        this.loading = false
        this.step = 1
      }
    }
  }
}
</script>
