<template>
  <component v-bind:is="currentStep"
             :toggle-method="toggleStep"></component>
</template>

<script>
  import helper from '../utils/helper'
  import taxCalculatorStep1 from './taxCalculatorStep1'
  import taxCalculatorStep2 from './taxCalculatorStep2'
  export default {
    components: {
      taxCalculatorStep1,
      taxCalculatorStep2
    },
    data: () => ({
      currentStep: 'taxCalculatorStep1'
    }),
    methods: {
      toggleStep () {
        this.currentStep = this.currentStep === 'taxCalculatorStep1' ? 'taxCalculatorStep2' : 'taxCalculatorStep1'
      }
    },
    created () {
      helper.title('2018最新个税计算器')
    }
  }
</script>
