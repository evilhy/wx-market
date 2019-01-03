import { typeOf } from 'utils/assist'
const $grossPay = Symbol('$grossPay')
const $socialSecurityFund = Symbol('$socialSecurityFund')
const $specialFund = Symbol('$specialFund')
const $taxBase = Symbol('$taxBase')

export default class TaxCalculator {

  constructor (grossPay = 0, socialSecurityFund = 0, specialFund = 0) {
    if (typeOf(grossPay) !== 'number') throw new TypeError('应发金额类型应为Number')
    if (typeOf(socialSecurityFund) !== 'number') throw new TypeError('免税收入金额类型应为Number')
    if (typeOf(specialFund) !== 'number') throw new TypeError('专项扣除金额类型应为Number')
    this[$grossPay] = grossPay
    this[$socialSecurityFund] = socialSecurityFund
    this[$specialFund] = specialFund
  }

  [$grossPay] = 0; // 应发金额

  [$socialSecurityFund] = 0; // 免税收入金额

  [$specialFund] = 0; // 专项扣除金额

  [$taxBase] = 5000; // 费用扣除标准
  /**
   * 税率
   *
   * @returns
   * @memberof TaxCalculator
   */
  taxRate () {
    let _taxableIncome = this.taxableIncome()
    if (_taxableIncome > 80000) {
      return 0.45
    } else if (_taxableIncome <= 80000 && _taxableIncome > 55000) {
      return 0.35
    } else if (_taxableIncome <= 55000 && _taxableIncome > 35000) {
      return 0.3
    } else if (_taxableIncome <= 35000 && _taxableIncome > 25000) {
      return 0.25
    } else if (_taxableIncome <= 25000 && _taxableIncome > 12000) {
      return 0.2
    } else if (_taxableIncome <= 12000 && _taxableIncome > 3000) {
      return 0.1
    } else if (_taxableIncome <= 3000 && _taxableIncome > 0) {
      return 0.03
    } else {
      return 0
    }
  }
  /**
   * 速算扣除数
   *
   * @returns
   * @memberof TaxCalculator
   */
  quickCalculationDeduction () {
    let _taxRate = this.taxRate()
    switch (_taxRate) {
      case 0.45:
        return 15160
      case 0.35:
        return 7160
      case 0.3:
        return 4410
      case 0.25:
        return 2660
      case 0.2:
        return 1410
      case 0.1:
        return 210
      default:
        return 0
    }
  }
  /**
   * @description  应纳税所得额
   * @return Number
   * */
  taxableIncome () {
    let result = this[$grossPay] - this[$socialSecurityFund] - this[$taxBase] - this[$specialFund]
    return result > 0 ? result : 0
  }

  /**
   * @description  应扣税额
   * @return Number
   * */
  taxAmount () {
    // eslint-disable-next-line
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
