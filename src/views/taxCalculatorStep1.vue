<template>
  <div class="tax-calculator-step1">
    <img src="../assets/img/tax/banner-top.png" alt="">
    <div class="main-form">
      <div class="page-title">个税计算器</div>
      <input type="tel" placeholder="您的月收入金额" v-model.number="income">
      <input type="tel" placeholder="五险一金（免税扣除）" v-model.number="deduction">
      <button class="guide" @click="toggleVisible"><i class="iconfont icon-shurushuoming"></i>输入说明</button>
      <button class="submit-btn"
              :disabled="disabledSubmit"
              @click="submitFun">算一算</button>
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
  import _ from 'lodash'
  import TaxState from '../utils/TaxCalculator/TaxState'
  export default {
    computed: {
      disabledSubmit () {
        return !(_.isNumber(this.income) && _.isNumber(this.deduction))
      }
    },
    data: () => ({
      income: '',
      deduction: '',
      visibleModal: false
    }),
    methods: {
      submitFun () {
        TaxState.commit('setData', {name: 'income', value: this.income})
        TaxState.commit('setData', {name: 'deduction', value: this.deduction})
        this.income = ''
        this.deduction = ''
        TaxState.commit('toggleStep')
      },
      toggleVisible () {
        this.visibleModal = !this.visibleModal
      }
    }
  }
</script>
