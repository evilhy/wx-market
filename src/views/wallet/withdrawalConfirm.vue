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
        <van-button type="primary" :disabled="btnDisabled" @click="toWithdraw">
          确认提现</van-button>
      </div>
      <van-action-sheet v-model="show" :actions="banks" close-on-popstate close-on-click-action title="选择提现收款账户" @select="onSelect" />
    </template>
    <template v-else>
      <login-by-pwd :is-page="false" @next="sure"></login-by-pwd>
    </template>
    <van-action-sheet v-if="signInfo.signStatusVal" class="tax-signup-action-sheet" v-model="actionSheetShow" title="完成以下任务就可以提现啦！">
      <div class="signup-item">
        <span>① 完成身份信息认证</span>
        <!-- 0：未认证、1：认证中、2：认证失败、3：认证成功 -->
        <span class="success-text" v-if="signInfo.attestStatus === 3"><van-icon name="success" />认证成功</span>
        <van-button v-else plain size="small" :color="attestBtn.color" @click="$router.push({ name: 'uploadIdentity' })">{{attestBtn.text}}</van-button>
      </div>
      <div class="signup-item">
        <span>② 签约合作协议</span>
        <!-- 0:未签约、1：已签约 -->
        <span class="success-text" v-if="signInfo.signStatus === 1"><van-icon name="success" />已签约</span>
        <van-button v-else type="primary" plain size="small" :disabled="signLoading" @click="toSign">去签约</van-button>
      </div>
    </van-action-sheet>
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
      wageDetail: helper.getWithdrawDetail(),
      signInfo: {},
      actionSheetShow: false,
      signLoading: false
    }
  },
  computed: {
    btnDisabled() {
      return (
        this.loading ||
        !this.wageDetail.transAmount ||
        !Object.keys(this.selectedBank).length ||
        !this.signInfo.attestStatusVal ||
        !this.signInfo.signStatusVal
      )
    },
    attestBtn () {
      let attestStatus = this.signInfo.attestStatus
      switch (attestStatus) {
        case 0:
          return {
            color: '#00CCCC',
            text: '去认证'
          }
        case 1:
          return {
            color: '#FF9124',
            text: '认证中'
          }
        case 2:
          return {
            color: '#F4415F',
            text: '重新认证'
          }
        default:
          return {
            color: '#00CCCC',
            text: '去认证'
          }
      }
    }
  },
  async created() {
    helper.title('余额提现')
    await this.getSignDetail()
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
    async getSignDetail() {
      let res = await this.$Tax.signingDetails()
      this.signInfo = res.data
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
    toWithdraw() {
      let { attestStatus, signStatus } = this.signInfo
      if (attestStatus === 3 && signStatus === 1) {
        this.step = 2
      } else {
        this.actionSheetShow = true
      }
    },
    async toSign () {
      let { attestStatus, taxSignId } = this.signInfo
      if (attestStatus === 0) {
        helper.toast('请先完成身份信息认证再签约')
        return
      }
      try {
        this.signLoading = true
        let res = await this.$Tax.signing(taxSignId)
        window.location.href = res.data.url
      } catch (e) {
        this.signLoading = false
      }
    },
    async sure() {
      try {
        this.loading = true
        await this.$Wallet.withdraw({
          withdrawalLedgerId: this.id,
          cardNo: this.selectedBank.cardNo
        })
        this.$router.go(-1)
      } catch (e) {
        this.loading = false
        this.step = 1
      }
    }
  }
}
</script>
