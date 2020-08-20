<template>
  <div class="wallet-wrap">
    <div class="wallet-content">
      <div class="header">放薪钱包
        <van-icon v-if="type === 'outer'" name="arrow" color="white" @click.native="toPage('wallet')" />
      </div>
      <div class="main">
        <div class="col money">
          <span class="value" v-if="eyeFlag">{{balance}}</span>
          <span class="value star" v-if="!eyeFlag">****</span>
          <span class="label" @click="toggleBalance">
            <span class="text">钱包余额(元)</span>
            <i class="icon-ai44 iconfont" v-show="eyeFlag"></i>
            <i class="icon-ai47 iconfont" v-show="!eyeFlag"></i>
          </span>
        </div>
        <div class="col bank-card">
          <div class="item bank" @click="toPage('bankcardList')">
            <span class="value">{{bankCount}}<span class="label">张</span></span>
            <span class="label">银行卡</span>
          </div>
          <div class="item card" @click="toPage('welfareList')">
            <span class="value">{{cardCount}}<span class="label">张</span></span>
            <span class="label">福利卡券</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helper from 'utils/helper'
import decryptInfo from 'utils/decryptInfo'
export default {
  props: {
    type: {
      type: String,
      default: 'outer'
    }
  },
  data () {
    return {
      balance: '',
      bankCount: 0,
      cardCount: 0,
      eyeFlag: helper.checkShowBalance()
    }
  },
  created () {
    this.getBalanceAndCard()
    this.getCardCount()
  },
  methods: {
    async getBalanceAndCard () {
      let res = await this.$Wallet.getBalance()
      let { balance = '', cardNum = 0 } = decryptInfo(res.data, 'balance')
      this.balance = balance
      this.bankCount = cardNum
    },
    async getCardCount () {
      let res = await this.$Wisales.getCardCount()
      this.cardCount = res.data.prizeExchangeNum
    },
    toggleBalance () {
      if (this.eyeFlag) { // 关闭
        this.eyeFlag = false
        helper.saveBalanceStatus(false)
      } else {
        if (helper.getUserInfo('ifPwd', 0)) { // 有密码
          if (helper.checkFreeLogin()) { // 近期输入过密码
            this.eyeFlag = true
          } else {
            this.$router.push({ name: 'loginByPwd' })
          }
        } else {
          this.$router.push({ name: 'setQueryCode' })
        }
      }
    },
    toPage (routeName) {
      this.$emit('to-page', routeName)
    }
  }
}
</script>