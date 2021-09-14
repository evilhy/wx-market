<template>
  <div class="tax-calculator-page">
    <component v-bind:is="currentStep"></component>
    <div class="bottom-logo" v-if="currentStep !== 'taxCalculatorStep2'">
      <!-- <img src="../../assets/img/hx-gray-logo.png" class="hx" />
      <div class="line"></div> -->
      <img src="../../assets/img/fx-gray-logo.png" class="fx" />
    </div>
  </div>
</template>

<script>
import TaxState from 'utils/TaxCalculator/state'
import taxCalculatorStep1 from './taxCalculatorStep1'
import taxCalculatorStep2 from './taxCalculatorStep2'
import taxCalculatorStep3 from './taxCalculatorStep3'

export default {
  components: {
    taxCalculatorStep1,
    taxCalculatorStep2,
    taxCalculatorStep3
  },
  computed: {
    currentStep() {
      return TaxState.state.currentStep
    }
  },
  created() {}
}
</script>
