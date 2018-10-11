<template>
  <div class="tax-calculator-step1">
    <div class="main-form">
      <div class="page-title">个税计算器</div>
      <input type="tel" placeholder="您的月收入金额" v-model.number="income">
      <input type="tel" placeholder="五险一金（免税扣除）" v-model.number="deduction">
      <button class="guide">输入说明</button>
      <button class="submit-btn"
              :disabled="disabledSubmit"
              @click="submitFun">算一算</button>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      toggleMethod: {
        type: Function,
        required: true
      }
    },
    computed: {
      disabledSubmit () {
        return !(_.isNumber(this.income) && _.isNumber(this.deduction))
      }
    },
    data: () => ({
      income: '',
      deduction: ''
    }),
    methods: {
      submitFun () {
        this.toggleMethod()
      }
    }
  }
</script>
