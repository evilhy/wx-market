<template>
  <div class="t-finance-confirm-page t-finance-page">
    <client-info :name="userInfo.clientName" :id-number="userInfo.idNumberStar" :phone="userInfo.clientPhone" @update="updatePhoneFlag = true"></client-info>
    <div class="amt-wrap">
      <div class="line-title">预约额度填写</div>
      <div class="input-wrap">
        <input v-model.number="intentAmount" @blur="checkMoney" class="input" type="number" :placeholder="`最小预约金额${minIntentAmt}起`" >
        <span class="unit">元</span>
      </div>
      <div class="protocol-wrap">
        <v-checkbox v-model="protocol" name="protocol"></v-checkbox>
        <span class="text" @click="openProtocol">阅读并同意<span class="theme-color">《华夏银行理财同事团活动用户协议》</span></span>
      </div>
    </div>
    <manager-info :name="userInfo.managerName" :phone="userInfo.managerPhone" :avator="userInfo.managerImg"></manager-info>
    <div class="bottom-action">
      <div class="fixed-time" v-if="userInfo.nowDate && intentEndDate">
        <template v-if="orderEnd">
          预约已结束
        </template>
        <template v-else>
          剩余<count-down :now="userInfo.nowDate" :target="intentEndDate" @end="orderEnd = true"></count-down>结束
        </template>
      </div>
      <div class="btn theme-btn" :class="[this.userInfo.hxBank === 0 ? 'long' : 'full', {'gray-btn': orderEnd || !protocol}]" @click="order">确认预约</div>
      <div class="btn white-btn short system-tip" @click="tipFlag = true" v-if="this.userInfo.hxBank === 0">
        <img class="icon" src="../../assets/img/tfinance/icon-system-tip.png" alt=""/>温馨提示</div>
    </div>
    <system-popup v-if="tipFlag" @close="tipFlag = false"></system-popup>
    <update-phone :phone="userInfo.clientPhone" @sure="updatePhone" @cancel="updatePhoneFlag = false" v-if="updatePhoneFlag"></update-phone>
    <protocol ref="protocol"></protocol>
  </div>
</template>
<script>
import clientInfo from './components/clientInfo'
import managerInfo from './components/managerInfo'
import systemPopup from './components/systemPopup'
import countDown from '../../components/countDown'
import updatePhone from './components/updatePhone'
import protocol from './components/protocol'
import vCheckbox from '../../components/vCheckbox'
import helper from 'utils/helper'
export default {
  data () {
    return {
      intentAmount: '',
      userInfo: {
        clientName: '',
        idNumber: '',
        idNumberStar: '',
        clientPhone: '',
        clientPhoneStar: '',
        custManagerId: '',
        managerName: '',
        managerPhone: '',
        managerImg: '',
        hxBank: -1,
        nowDate: 0
      },
      protocol: 1,
      intentEndDate: helper.getTFinanceInfo('intentEndDate'),
      minIntentAmt: helper.getTFinanceInfo('minIntentAmt'),
      tipFlag: false,
      updatePhoneFlag: false,
      orderEnd: false
    }
  },
  created () {
    helper.title('理财预约')
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      let res = await this.$Tfinance.userInfo()
      this.userInfo = res.data
      let { hxBank, nowDate } = this.userInfo
      this.tipFlag = hxBank === 0
      this.orderEnd = nowDate >= this.intentEndDate
    },
    updatePhone (phone) {
      let isUpdate = this.userInfo.clientPhone !== phone
      this.updatePhoneFlag = false
      this.userInfo.clientPhone = phone
      isUpdate && helper.toast('修改成功')
    },
    checkMoney () {
      if (!this.intentAmount) {
        helper.toast('请输入预约金额')
        return false
      }
      if (Number(this.intentAmount) < this.minIntentAmt) {
        this.intentAmount = this.minIntentAmt
      }
      return true
    },
    async order () {
      if (this.orderEnd || !this.protocol) return
      if (!this.checkMoney()) return
      let { custManagerId, clientName, idNumber, clientPhone } = this.userInfo
      await this.$Tfinance.intent({
        protocol: this.protocol,
        custManagerId,
        clientName,
        idNumber,
        clientPhone,
        intentAmount: this.intentAmount
      })
      this.$router.replace({ name: 'tfinanceResult' })
    },
    openProtocol () {
      this.$refs['protocol'].open()
    }
  },
  components: {
    clientInfo,
    managerInfo,
    systemPopup,
    countDown,
    updatePhone,
    protocol,
    vCheckbox
  }
}
</script>
