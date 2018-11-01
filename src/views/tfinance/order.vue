<template>
  <div class="t-finance-order-page">
    <product-level></product-level>
    <product-notice></product-notice>
    <product-point></product-point>
    <activity-rule></activity-rule>
  </div>
</template>
<script>
import productLevel from './components/productLevel'
import productNotice from './components/productNotice'
import productPoint from './components/productPoint'
import activityRule from './components/activityRule'
import helper from 'utils/helper'
export default {
  data () {
    return {}
  },
  created () {
    helper.title('同事理财团')
  },
  components: {
    productLevel,
    productNotice,
    productPoint,
    activityRule
  }
}
</script>
