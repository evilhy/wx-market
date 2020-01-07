<template>
  <div class="tax-calculator-step1">
    <div class="main-form">
      <div class="page-title">个税计算器</div>
      <p class="input-label">税前工资</p>
      <input type="tel" placeholder="您的每月税前工资（元）" :value="income" @blur="updateData($event, 'income')">
      <p class="input-label">减除费用</p>
      <input type="tel" placeholder="个税起征点标准5000" :value="base" disabled>
      <p class="input-label">专项扣除</p>
      <input type="tel" placeholder="社保/公积金" :value="deduction" @blur="updateData($event, 'deduction')">
      <p class="input-label">专项附加扣除<span class="helper-btn" @click="helpCal">帮我计算<span class="arrow"></span></span></p>
      <input type="tel" placeholder="子女教育/赡养老人/住房贷款/住房租金/继续教育" :value="specialDeduction"
        @blur="updateData($event, 'specialDeduction')">
      <button class="submit-btn" :disabled="disabledSubmit" @click="submitFun">开始试算</button>
      <p class="tax-explain-link"><span @click="toPage('taxInstructions')">个税解读</span></p>
    </div>
  </div>
</template>

<script>
import { typeOf } from 'utils/assist'
import TaxState from 'utils/TaxCalculator/state'
export default {
  data () {
    return {
      popupType: 'normal',
      base: 5000
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
      let nValue = (Number.isNaN(Number(value)) || !value.length) ? '' : Math.floor(value)
      TaxState.commit('updateData', { type, value: nValue > 0 ? nValue : 0 })
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
    toPage (name) {
      this.$router.push({ name })
    }
  }
}
</script>
