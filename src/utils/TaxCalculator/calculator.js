
import { typeOf } from '../assist'

const $baseTax = Symbol('$baseTax')
const $wage = Symbol('$wage')
const $socialSecurityFund = Symbol('$socialSecurityFund')
const $specialDeFund = Symbol('$specialDeFund')
const $currentMonth = Symbol('$currentMonth')
const $lastMonth = Symbol('$lastMonth')
const $taxRate = Symbol('$taxRate')
const $quickDeduction = Symbol('$quickDeduction')
const $totalLastTaxPay = Symbol('$totalLastTaxPay')
const $monthRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

class Calculator {

  [$baseTax] = 5000; // 起征点

  [$wage] = 0; // 当月工资

  [$socialSecurityFund] = 0; // 免税收入(五险一金)

  [$specialDeFund] = 0; // 专项扣除

  [$currentMonth] = 1; // 当前月份

  [$lastMonth] = 0; // 上一月份
  
  [$taxRate] = 0; // 当月税率

  [$quickDeduction] = 0; // 速算扣除数

  [$totalLastTaxPay] = 0; // 累计已纳个税

  constructor(wage = 0, socialSecurityFund = 0, specialDeFund = 0, currentMonth = 1) { // wage
    if (typeOf(wage) !== 'number') throw new TypeError('应发金额类型应为Number')
    if (typeOf(socialSecurityFund) !== 'number') throw new TypeError('免税收入金额类型应为Number')
    if (typeOf(specialDeFund) !== 'number') throw new TypeError('专项扣除金额类型应为Number')
    if (typeOf(currentMonth) !== 'number') throw new TypeError('当前月份类型应为Number')
    if (!$monthRange.includes(Number(currentMonth))) throw new TypeError('当前月份应为有效的月份')

    this[$wage] = Number(wage)
    this[$socialSecurityFund] = Number(socialSecurityFund)
    this[$specialDeFund] = Number(specialDeFund)
    this[$currentMonth] = Number(currentMonth)
    this[$lastMonth] = (this[$currentMonth] - 1) > 0 ? (this[$currentMonth] - 1) : 0
  }
  /**
   * 计算累计应纳税所得额
   *
   * @param {number} [month=1] 月份
   * @returns
   * @memberof Calculator
   */
  calTotalTaxIncome (month = 1) {
    if (month === 0) return 0

    let deFund = this[$wage] - this[$socialSecurityFund] - this[$specialDeFund] - this[$baseTax]
    deFund = deFund > 0 ? deFund : 0
    return deFund * month
  }
  /**
   * 计算累计应纳税额信息
   *
   * @param {number} [month=1] 月份
   * @returns
   * @memberof Calculator
   */
  calTotalTaxInfo (month = 1) {
    let result = { // 适应界面需求
      rate: 0,
      quickDeduction: 0,
      totalTaxPay: 0
    }
    if (month === 0) return result

    const totalTaxIncome = this.calTotalTaxIncome(month)
    if (totalTaxIncome <= 36000) {
      result.rate = 0.03
      result.quickDeduction = 0
    } else if (totalTaxIncome > 36000 && totalTaxIncome <= 144000) {
      result.rate = 0.1
      result.quickDeduction = 2520
    } else if (totalTaxIncome > 144000 && totalTaxIncome <= 300000) {
      result.rate = 0.2
      result.quickDeduction = 16920
    } else if (totalTaxIncome > 300000 && totalTaxIncome <= 420000) {
      result.rate = 0.25
      result.quickDeduction = 31920
    } else if (totalTaxIncome > 420000 && totalTaxIncome <= 660000) {
      result.rate = 0.3
      result.quickDeduction = 52920
    } else if (totalTaxIncome > 660000 && totalTaxIncome <= 960000) {
      result.rate = 0.35
      result.quickDeduction = 85920
    } else {
      result.rate = 0.45
      result.quickDeduction = 181920
    }
    result.totalTaxPay = totalTaxIncome * result.rate - result.quickDeduction
    return result
  }
  /**
   * 计算本月应纳税额
   *
   * @memberof Calculator
   */
  calCurrentTaxPay () {
    let currentTotalInfo = this.calTotalTaxInfo(this[$currentMonth])
    let lastTotalTaxPay = this.calTotalTaxInfo(this[$lastMonth]).totalTaxPay
    this[$taxRate] = currentTotalInfo.rate
    this[$quickDeduction] = currentTotalInfo.quickDeduction
    this[$totalLastTaxPay] = lastTotalTaxPay

    return currentTotalInfo.totalTaxPay - lastTotalTaxPay
  }
  /**
   * 计算本月税后工资
   *
   * @memberof Calculator
   */
  calAfterTaxWage () {
    return this[$wage] - this[$socialSecurityFund] - this.calCurrentTaxPay()
  }
  /**
   * 计算页面展示数据
   *
   * @memberof Calculator
   */
  calShowData () { 
    let shouldTaxPay = this.calCurrentTaxPay()
    let afterTaxWage = this.calAfterTaxWage()
    return {
      shouldTaxPay,  // 本月个税
      afterTaxWage,  // 本月税后工资
      totalWage: this[$wage] * this[$currentMonth], // 累计工资
      totalBaseTax: this[$baseTax] * this[$currentMonth], // 累计免税收入额
      totalSocialSecurityFund: this[$socialSecurityFund] * this[$currentMonth], // 累计专项扣除
      totalSpecialDeFund: this[$specialDeFund] * this[$currentMonth], // 累计专项附加扣除
      taxRate: this[$taxRate], // 本月税率
      quickDeduction: this[$quickDeduction], // 速算扣除数
      totalLastTaxPay: this[$totalLastTaxPay] // 累计已纳税额
    }
  }
}

export default Calculator