
import { typeOf } from '../assist'

const $baseTax = Symbol('$baseTax')
const $wage = Symbol('$wage')
const $socialSecurityFund = Symbol('$socialSecurityFund')
const $specialDeFund = Symbol('$specialDeFund')
const $currentMonth = Symbol('$currentMonth')
const $lastMonth = Symbol('$lastMonth')
const $monthRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

class Calculator {

  [$baseTax] = 5000; // 起征点

  [$wage] = 0; // 当月工资

  [$socialSecurityFund] = 0; // 免税收入(五险一金)

  [$specialDeFund] = 0; // 专项扣除

  [$currentMonth] = 1; // 当前月份

  [$lastMonth] = 0; // 上一月份

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
   * 计算累计应纳税额
   *
   * @param {number} [month=1] 月份
   * @returns
   * @memberof Calculator
   */
  calTotalTaxPay (month = 1) {
    if (month === 0) return 0

    const totalTaxIncome = this.calTotalTaxIncome(month)
    if (totalTaxIncome <= 36000) {
      return totalTaxIncome * 0.03
    } else if (totalTaxIncome > 36000 && totalTaxIncome <= 144000) {
      return totalTaxIncome * 0.1 - 2520
    } else if (totalTaxIncome > 144000 && totalTaxIncome <= 300000) {
      return totalTaxIncome * 0.2 - 16920
    } else if (totalTaxIncome > 300000 && totalTaxIncome <= 420000) {
      return totalTaxIncome * 0.25 - 31920
    } else if (totalTaxIncome > 420000 && totalTaxIncome <= 660000) {
      return totalTaxIncome * 0.3 - 52920
    } else if (totalTaxIncome > 660000 && totalTaxIncome <= 960000) {
      return totalTaxIncome * 0.35 - 85920
    } else if (totalTaxIncome > 960000) {
      return totalTaxIncome * 0.45 - 181920
    } else { 
      return 0
    }
  }
  /**
   * 计算本月应纳税额
   *
   * @memberof Calculator
   */
  calCurrentTaxPay () {
    let totalTaxPay = this.calTotalTaxPay(this[$currentMonth]) // 累计应纳税额
    let totalLastTaxPay = this.calTotalTaxPay(this[$lastMonth]) // 累计已纳税额
    return totalTaxPay - totalLastTaxPay
  }
  /**
   * 计算本月税后工资
   *
   * @memberof Calculator
   */
  calAfterTaxWage () {
    return this[$wage] - this[$socialSecurityFund] - this.calCurrentTaxPay()
  }
}

export default Calculator