<template>
  <component v-bind:is="currentStep"></component>
</template>

<script>
  import helper from 'utils/helper'
  import taxCalculatorStep1 from './taxCalculatorStep1'
  import taxCalculatorStep2 from './taxCalculatorStep2'
  import TaxState from 'utils/TaxCalculator/TaxState'
  export default {
    components: {
      taxCalculatorStep1,
      taxCalculatorStep2
    },
    computed: {
      currentStep () {
        return TaxState.state.currentStep
      }
    },
    created () {
      helper.title('2018最新个税计算器')
    }
  }
</script>
