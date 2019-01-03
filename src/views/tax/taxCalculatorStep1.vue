<template>
  <div class="tax-calculator-step1">
    <img src="../../assets/img/tax/banner-top.png" alt="">
    <div class="main-form">
      <div class="page-title">个税计算器<span class="guide-btn" @click="toggleVisible"><i class="iconfont icon-shurushuoming"></i>输入说明</span></div>
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
    <div class="modal-info" v-show="visibleModal">
      <div class="modal-main">
        <h1>输入说明</h1>
        <div class="content">
          <p>按照新个税法，10月1日-12月31日，先提高起征点至5000元/月，并按照新的税率执行。</p>
          <p class="gray">此计算器只计算居民工资、薪金所得，不计算经营、利息、股息、红利、财产租赁、财产转让、偶然所得。2019年起劳务报酬、稿酬、特许权使用费将合并计算个人所得税。</p>
        </div>
        <button class="close" @click="toggleVisible">
          <i class="iconfont icon-guanbianniu2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { typeOf } from 'utils/assist'
import TaxState from 'utils/TaxCalculator/TaxState'
export default {
  data () {
    return {
      visibleModal: false
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
      if (!value.length) return false
      TaxState.commit('updateData', { type, value: Number.isNaN(Number(value)) ? 0 : Number(value) })
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
    toggleVisible () {
      this.visibleModal = !this.visibleModal
    }
  }
}
</script>
