<template>
  <div class="tax-calculator-step1">
    <img class="banner" src="../../assets/img/tax/banner-top.png" alt="">
    <div class="main-form">
      <div class="page-title">个税计算器<span class="guide-btn" @click="openPopup('explain')"><i class="iconfont icon-shurushuoming"></i>输入说明</span></div>
      <div class="month" @click="openPopup('month')"><span class="month-label">请选择月份</span><span class="month-value">{{monthZh}}</span></div>
      <input type="tel" placeholder="您的月收入金额" :value="income" @blur="updateData($event, 'income')">
      <input type="tel" placeholder="免税收入额（免税扣除）" :value="deduction" @blur="updateData($event, 'deduction')">
      <div class="special-deduction-input-wrap">
        <input type="tel" placeholder="专项扣除金额" :value="specialDeduction" @blur="updateData($event, 'specialDeduction')">
        <span class="helper-btn" @click="helpCal">帮我计算<span class="arrow"></span></span>
      </div>
      <button class="submit-btn" :disabled="disabledSubmit" @click="submitFun">算一算</button>
    </div>
    <div class="bottom-logo">
      <!-- <img src="../../assets/img/hx-gray-logo.png" class="hx" />
      <div class="line"></div> -->
      <img src="../../assets/img/fx-gray-logo.png" class="fx" />
    </div>
    <explain-popup ref="explain-popup" :type="popupType"></explain-popup>
    <month-popup ref="month-popup" :month="month" @sure="updateMonth"></month-popup>
  </div>
</template>

<script>
import { typeOf } from 'utils/assist'
import TaxState from 'utils/TaxCalculator/state'
import explainPopup from './explain-popup'
import monthPopup from './month-popup'
export default {
  data () {
    return {
      popupType: 'normal',
      monthPopupFlag: false
    }
  },
  computed: {
    month () {
      return TaxState.state.month
    },
    monthZh () {
      let monthRange = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      return monthRange[this.month - 1]
    },
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
      let nValue = (Number.isNaN(Number(value)) || !value.length) ? '' : Number(value)
      TaxState.commit('updateData', { type, value: nValue > 0 ? nValue : 0 })
    },
    updateMonth ({ value }) {
      TaxState.commit('updateData', { type: 'month', value })
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
    openPopup (type) {
      this.$refs[`${type}-popup`].show()
    }
  },
  components: {
    explainPopup,
    monthPopup
  }
}
</script>
