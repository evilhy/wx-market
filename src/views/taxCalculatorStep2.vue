<template>
  <div class="tax-calculator-step2">
    <div class="content-block">
      <div class="page-title">新版（5000元起征点）</div>
      <div class="tax-box">
        <div class="tax-item">
          <p>税后工资</p>
          <p>6889.88元</p>
        </div>
        <div class="tax-item">
          <p>应纳个税</p>
          <p>6889.88元</p>
        </div>
      </div>
      <div class="page-title">旧版（3500元起征点）</div>
      <div class="tax-box">
        <div class="tax-item">
          <p>税后工资</p>
          <p>6889.88元</p>
        </div>
        <div class="tax-item">
          <p>应纳个税</p>
          <p>6889.88元</p>
        </div>
      </div>
    </div>
    <div class="content-block">
      <p class="text-1">每年能省<strong>360.00</strong>元</p>
      <p class="text-2">苍蝇也是肉，能省一点是一点吧~</p>
    </div>
    <div class="footer">
      <button class="submit-btn" @click="toggleMethod">再算一次</button>
      <p>温馨提示：2019年起，教育、医疗、住房和养老等支出还能税前扣除，你省的钱将更多。</p>
    </div>
  </div>
</template>

<script>
  import LatestTaxCalculator from '../utils/TaxCalculator/LatestTaxCalculator'
  import PreviousTaxCalculator from '../utils/TaxCalculator/PreviousTaxCalculator'
  export default {
    props: {
      toggleMethod: {type: Function, required: true},
      income: {type: Number, required: true},
      deduction: {type: Number, required: true}
    }
  }
</script>
