<template>
  <div class="tax-calculator-step1">
    <img class="banner" src="../../assets/img/tax/banner-top.png" alt="">
    <div class="main-form">
      <div class="page-title">个税计算器<span class="guide-btn" @click="openExplainPopup"><i class="iconfont icon-shurushuoming"></i>输入说明</span></div>
      <input type="tel" placeholder="您的月收入金额" :value="income" @blur="updateData($event, 'income')">
      <input type="tel" placeholder="免税收入额（免税扣除）" :value="deduction" @blur="updateData($event, 'deduction')">
      <div class="special-deduction-input-wrap">
        <input type="tel" placeholder="专项扣除金额" :value="specialDeduction" @blur="updateData($event, 'specialDeduction')">
        <span class="helper-btn" @click="helpCal">帮我计算<span class="arrow"></span></span>
      </div>
      <button class="submit-btn" :disabled="disabledSubmit" @click="submitFun">算一算</button>
    </div>
    <div class="bottom-logo">
      <img src="../../assets/img/hx-gray-logo.png" class="hx" />
      <div class="line"></div>
      <img src="../../assets/img/fx-gray-logo.png" class="fx" />
    </div>
    <explain-popup ref="explain-popup" :type="popupType"></explain-popup>
  </div>
</template>

<script>
import { typeOf } from 'utils/assist'
import TaxState from 'utils/TaxCalculator/TaxState'
import explainPopup from './explain-popup'
export default {
  data () {
    return {
      popupType: 'normal'
    }
  },
  computed: {
    income () { // 收入
      return TaxState.state.income
    },
    deduction () { // 免税收入额
      return TaxState.state.deduction
    },
    specialDeduction () { // 专项扣除金额
      return TaxState.state.specialDeduction
    },
    deductionDetailTotal () { // 计算出的专项扣除金额
      return TaxState.getters.deductionDetailTotal
    },
    disabledSubmit () {
      return !(typeOf(this.income) === 'number' && typeOf(this.deduction) === 'number' && typeOf(this.specialDeduction) === 'number')
    }
  },
  methods: {
    updateData (e, type) {
      let value = e.target.value
      TaxState.commit('updateData', { type, value: (Number.isNaN(Number(value)) || !value.length) ? '' : Number(value) })
    }, 
    helpCal () {
      if (this.deductionDetailTotal !== this.specialDeduction) {
        TaxState.commit('clearDeductionDetail')
      }
      TaxState.commit('changeStep', 'taxCalculatorStep2')
    },
    submitFun () {
      TaxState.commit('changeStep', 'taxCalculatorStep3')
    },
    openExplainPopup () {
      this.$refs['explain-popup'].show()
    }
  },
  components: {
    explainPopup
  }
}
</script>
