<template>
  <div class="tax-calculator-step2">
    <div class="content-block">
      <div class="page-title">新版（5000元起征点）</div>
      <div class="tax-box">
        <div class="tax-item">
          <p>税后工资</p>
          <p>{{ latestData.wage | money }}元</p>
        </div>
        <div class="tax-item">
          <p>应纳个税</p>
          <p>{{ latestData.tax | money }}元</p>
        </div>
      </div>
      <div class="page-title">旧版（3500元起征点）</div>
      <div class="tax-box">
        <div class="tax-item">
          <p>税后工资</p>
          <p>{{ previousData.wage | money }}元</p>
        </div>
        <div class="tax-item">
          <p>应纳个税</p>
          <p>{{ previousData.tax | money }}元</p>
        </div>
      </div>
    </div>
    <div class="content-block">
      <img :src="infoForSaveAmount.img" alt="" class="text-img">
      <p class="text-1">每年能省<strong>{{ saveAmount | money }}</strong>元</p>
      <p class="text-2">{{ infoForSaveAmount.desc }}</p>
    </div>
    <div class="footer">
      <button class="submit-btn" @click="submitFun">再算一次</button>
      <p>温馨提示：2019年起，教育、医疗、住房和养老等支出还能税前扣除，你省的钱将更多。</p>
    </div>
  </div>
</template>

<script>
  import LatestTaxCalculator from '../utils/TaxCalculator/LatestTaxCalculator'
  import PreviousTaxCalculator from '../utils/TaxCalculator/PreviousTaxCalculator'
  import TaxState from '../utils/TaxCalculator/TaxState'
  import _ from 'lodash'
  export default {
    computed: {
      income () {
        return TaxState.state.income
      },
      deduction () {
        return TaxState.state.deduction
      },
      saveAmount () {
        return this.previousData.tax >= this.latestData.tax
          ? _.floor((this.previousData.tax - this.latestData.tax) * 12, 2)
          : 0
      },
      infoForSaveAmount () {
        let info = new Map([
          [1, {desc: '恩，好好工作，努力加薪吧~', img: '/static/img/tax/level-1.png'}],
          [2, {desc: '苍蝇也是肉，能省一点是一点吧~', img: '/static/img/tax/level-2.png'}],
          [3, {desc: '不错哦，每月可以加一顿大餐了~', img: '/static/img/tax/level-3.png'}],
          [4, {desc: '好激动，马尔代夫的海近在眼前~', img: '/static/img/tax/level-4.png'}],
          [5, {desc: '厉害，好像可以换辆车了~', img: '/static/img/tax/level-5.png'}],
          [6, {desc: '哇塞，你省出了一艘游艇~', img: '/static/img/tax/level-6.png'}]
        ])
        let level
        if (this.saveAmount >= 20000) {
          level = 6
        } else if (this.saveAmount < 20000 && this.saveAmount >= 10000) {
          level = 5
        } else if (this.saveAmount < 10000 && this.saveAmount >= 5000) {
          level = 4
        } else if (this.saveAmount < 5000 && this.saveAmount >= 1000) {
          level = 3
        } else if (this.saveAmount < 1000 && this.saveAmount >= 1) {
          level = 2
        } else {
          level = 1
        }
        return info.get(level)
      }
    },
    data: () => ({
      latestData: {wage: 0, tax: 0},
      previousData: {wage: 0, tax: 0}
    }),
    methods: {
      submitFun () {
        TaxState.commit('toggleStep')
      },
      getPageData () {
        let latestTaxCalculator = new LatestTaxCalculator(this.income, this.deduction)
        let previousTaxCalculator = new PreviousTaxCalculator(this.income, this.deduction)
        this.latestData.wage = latestTaxCalculator.wagePayment()
        this.latestData.tax = latestTaxCalculator.taxAmount()
        this.previousData.wage = previousTaxCalculator.wagePayment()
        this.previousData.tax = previousTaxCalculator.taxAmount()
      }
    },
    created () {
      this.getPageData()
    }
  }
</script>
