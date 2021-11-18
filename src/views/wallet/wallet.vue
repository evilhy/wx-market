<template>
  <div class="wallet-wrap" :class="[type]">
    <div class="wallet-content">
      <div class="header">
        <div class="wallet-title">
          放薪钱包
          <span @click="toggleBalance">
            <svg-icon svg-name="eye-show" fill="white" v-show="eyeFlag"></svg-icon>
            <svg-icon svg-name="eye-hidden" fill="white" v-show="!eyeFlag"></svg-icon>
          </span>
        </div>
        <template v-if="hasEWallet">
          <van-icon v-if="type === 'outer'" name="arrow" color="white"
            @click.native="toWallet" />
          <div v-else class="withdrawal-btn"
            :class="{ disabled: withdrawDisabled }" @click="toWithdraw">提现</div>
        </template>
      </div>
      <div class="main">
        <div class="col money">
          <span class="value"
            v-if="eyeFlag">{{ $filter.money(info.balance, 2, '') }}</span>
          <span class="value star" v-if="!eyeFlag">****</span>
          <span class="label">钱包余额(元)</span>
        </div>
        <div class="col bank" @click="toPage('bankcardList')">
          <span class="value">{{ info.cardNum }}<span
              class="label">张</span></span>
          <span class="label">银行卡</span>
        </div>
        <div class="col welfare-card" @click="toPage('welfareList')">
          <span class="value">{{ info.cardCount }}<span
              class="label">张</span></span>
          <span class="label">卡券</span>
        </div>
        <div class="col money">
          <span class="value"
            v-if="eyeFlag">{{ $filter.money(info.recentlyIssuedAmt, 2, '') }}</span>
          <span class="value star" v-if="!eyeFlag">****</span>
          <span class="label">最近一笔收入</span>
        </div>
      </div>
    </div>
    <!-- isAttest -->
    <!-- signNumber -->
    <div class="sign-link" v-if="info.isAttest !== true || info.signNumber > 0"
      @click="$router.push({ name: 'signAttest' })">
      <img id="sign-tip" :class="tipClass"
        src="../../assets/img/icon-sign-num.png" alt="" />
      <span
        class="notice-count">{{ Number(!info.isAttest) + info.signNumber }}</span>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
import { reactive } from 'vue'

export default {
  props: {
    type: {
      type: String,
      default: 'outer'
    }
  },
  setup() {
    const info = reactive({
      isAttest: true,
      signNumber: 0,
      cardNum: 0,
      cardCount: 0
    })
    return {
      info
    }
  },
  data() {
    return {
      eyeFlag: helper.checkShowBalance(),
      timer: null,
      tipClass: 'pulse'
    }
  },
  computed: {
    withdrawDisabled() {
      let { withdrawStatus = 0, balance = 0 } = this.info
      return !withdrawStatus || !balance
    },
    hasEWallet() {
      return this.info.walletNumber
    }
  },
  created() {
    if (this.type === 'outer') return
    this.getWalletData()
  },
  mounted() {
    this.timer = setInterval(() => {
      let el = document.querySelector('#sign-tip')
      if (el) {
        this.tipClass = this.tipClass ? '' : 'pulse'
      }
    }, 600)
  },
  methods: {
    getWalletData() {
      this.getBalanceAndCard()
      this.getCardCount()
    },
    async getBalanceAndCard() {
      let res = await this.$Wallet.getBalanceAndCard()
      let info = decryptInfo(res.data, 'balance', 'walletNumber', 'recentlyIssuedAmt')
      Object.assign(this.info, info)
    },
    async getCardCount() {
      let res = await this.$Wisales.getCardCount()
      this.info.cardCount = res.data.prizeExchangeNum
    },
    toggleBalance() {
      if (this.eyeFlag) {
        // 关闭
        this.eyeFlag = false
        helper.saveBalanceStatus(false)
      } else if (helper.getUserInfo('ifPwd', 0)) {
        // 有密码
        if (helper.checkFreeLogin()) {
          // 近期输入过密码
          this.eyeFlag = true
        } else {
          this.$router.push({
            name: 'loginByPwd',
            query: { nextPage: this.$route.name }
          })
        }
      } else {
        this.$router.push({ name: 'setQueryCode' })
      }
    },
    toPage(name) {
      this.$router.push({ name })
    },
    toWithdraw() {
      if (this.withdrawDisabled) return
      this.toPage('balanceList')
    },
    toWallet() {
      if (helper.getUserInfo('ifPwd', 0)) {
        // 有密码
        if (helper.checkFreeLogin()) {
          // 近期输入过密码
          this.toPage('wallet')
        } else {
          this.$router.push({
            name: 'loginByPwd',
            query: { nextPage: 'wallet' }
          })
        }
      } else {
        this.$router.push({ name: 'setQueryCode' })
      }
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
