<template>
  <div class="tax-calculator-step3">
    <div class="main-form">
      <div class="page-title">试算结果</div>
      <div class="result-wrap">
        <div class="result-item">
          <p class="value">{{ $filter.money(currentMonthData.shouldTaxPay) }}</p>
          <p class="label">当月个税(元)</p>
        </div>
        <div class="result-item">
          <p class="value">{{ $filter.money(currentMonthData.afterTaxWage) }}</p>
          <p class="label">税后工资(元)</p>
        </div>
      </div>
      <div class="month-row">
        <div class="month-col" :class="{ active: currentMonth === item }" span="5.5" v-for="(item, index) in monthRange" :key="index" @click="currentMonth = item">
          <div class="month">{{ item }}月</div>
          <div class="tax">税率{{ allMonthTaxData[item - 1].taxRate * 100 }}%</div>
        </div>
      </div>
      <button class="submit-btn" @click="changeStep('taxCalculatorStep1')">重新试算</button>
      <p class="bar" @click="openFlag = !openFlag">展开试算过程<span class="arrow" :class="[openFlag ? 'top' : 'bottom']"></span></p>
    </div>
    <div class="result-explain" :style="{ height: `${explainHeight}px;` }">
      <div class="result-detail" :class="{ open: openFlag }">
        <div class="title">个税公式</div>
        <div>当月个税 = 应纳税所得额 x 个税税率 - 速算扣除数 - 累计已缴税额</div>
        <div class="title">计算详情</div>
        <div class="row">
          <span class="label">应纳税所得额(元)</span>
          <span class="value">{{ currentMonthData.totalTaxIncome }}</span>
        </div>
        <div class="tax-amt value">
          {{ currentMonthData.totalTaxIncome }}={{ currentMonthData.totalWage }}-{{ currentMonthData.totalBaseTax }}-{{ currentMonthData.totalSocialSecurityFund }}-{{
            currentMonthData.totalSpecialDeFund
          }}
        </div>
        <div class="tax-amt-explain">本年累计收入-累计减除费用-累计专项扣除-累计专项附加扣除</div>
        <div class="row">
          <span class="label">个税税率</span>
          <span class="value">x {{ currentMonthData.taxRate * 100 }}%</span>
        </div>
        <div class="row">
          <span class="label">速算扣除数(元)</span>
          <span class="value">- {{ $filter.money(currentMonthData.quickDeduction) }}</span>
        </div>
        <div class="row">
          <span class="label">累计已缴税额(元)</span>
          <span class="value">- {{ $filter.money(currentMonthData.totalLastTaxPay) }}</span>
        </div>
        <div class="row">
          <span class="label active-color">个税(元)</span>
          <span class="value active-color">{{ $filter.money(currentMonthData.shouldTaxPay) }}</span>
        </div>
        <div class="tip">当应纳税所得额超过一定额度时，则税率向上提高一级，详细可参考下表。</div>
      </div>
      <img v-if="openFlag" class="tax-rate-excel" src="../../assets/img/tax/tax-rate.png" alt="" />
    </div>
  </div>
</template>

<script>
import TaxCalculator from 'utils/TaxCalculator/calculator'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('calculator')

export default {
  data() {
    return {
      currentMonth: 1,
      monthRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      allMonthTaxData: [],
      openFlag: false
    }
  },
  computed: {
    ...mapState(['income', 'deduction', 'specialDeduction']),
    explainHeight() {
      if (this.openFlag) {
        return document.querySelector('.result-explain').offsetHeight
      }
      return 0
    },
    currentMonthData() {
      return this.allMonthTaxData[this.currentMonth - 1]
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    ...mapMutations(['changeStep']),
    getPageData() {
      this.monthRange.forEach((item) => {
        const taxCalculator = new TaxCalculator(this.income, this.deduction, this.specialDeduction, item)
        const data = taxCalculator.calShowData()
        this.allMonthTaxData.push(data)
      })
    },
    click(item) {
      this.currentMonth = item
    }
  }
}
</script>
