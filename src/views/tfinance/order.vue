<template>
  <div class="t-finance-order-page">
    <product-level></product-level>
    <!-- <product-notice></product-notice>
    <product-point></product-point>
    <activity-rule></activity-rule> -->
  </div>
</template>
<script>
import productLevel from './components/productLevel'
import productNotice from './components/productNotice'
import productPoint from './components/productPoint'
import activityRule from './components/activityRule'
export default {
  data () {
    return {}
  },
  components: {
    productLevel,
    productNotice,
    productPoint,
    activityRule
  }
}
</script>
