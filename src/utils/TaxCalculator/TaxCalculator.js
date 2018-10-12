/**
 * Created by duy on 2018/10/10 15:30.
 * @description  个税计算器
 */

import _ from 'lodash'

const $grossPay = Symbol('$grossPay')
const $socialSecurityFund = Symbol('$socialSecurityFund')
const $taxBase = Symbol('$taxBase')

export default class TaxCalculator {

  constructor (grossPay, socialSecurityFund) {
    if (!_.isNumber(grossPay)) throw TypeError('应发金额类型应为Number')
    if (!_.isNumber(socialSecurityFund)) throw TypeError('社保扣款类型应为Number')
    this[$grossPay] = grossPay
    this[$socialSecurityFund] = socialSecurityFund
  }

  [$grossPay] = 0; // 应发金额

  [$socialSecurityFund] = 0; // 社保扣款

  [$taxBase] = 0; // 费用扣除标准

  set taxBase (value) {
    if (!_.isNumber(value)) throw TypeError('费用扣除标准类型应为Number')
    this[$taxBase] = value
  }

  /**
   * @description  应纳税所得额
   * @return Number
   * */
  taxableIncome () {
    return this[$grossPay] - this[$socialSecurityFund] - this[$taxBase] > 0
      ? this[$grossPay] - this[$socialSecurityFund] - this[$taxBase]
      : 0
  }

  /**
   * @description  税率
   * @return Number
   * */
  taxRate () {
    return 0
  }

  /**
   * @description  速算扣除数
   * @return Number
   * */
  quickCalculationDeduction () {
    return 0
  }

  /**
   * @description  应扣税额
   * @return Number
   * */
  taxAmount () {
    return _.floor(this.taxableIncome() * this.taxRate() -
      this.quickCalculationDeduction(), 2)
  }

  /**
   * @description  实发金额
   * @return Number
   * */
  wagePayment () {
    return this[$grossPay] - this[$socialSecurityFund] - this.taxAmount()
  }
}
