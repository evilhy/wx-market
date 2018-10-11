/**
 * Created by duy on 2018/10/10 15:42.
 * @description  旧版个税个税计算器
 */

import TaxCalculator from './TaxCalculator'

export default class PreviousTaxCalculator extends TaxCalculator {

  taxBase = 3500

  taxRate () {
    let _taxableIncome = this.taxableIncome()
    if (_taxableIncome > 80000) {
      return 0.45
    } else if (_taxableIncome <= 80000 && _taxableIncome > 55000) {
      return 0.35
    } else if (_taxableIncome <= 55000 && _taxableIncome > 35000) {
      return 0.3
    } else if (_taxableIncome <= 35000 && _taxableIncome > 9000) {
      return 0.25
    } else if (_taxableIncome <= 9000 && _taxableIncome > 4500) {
      return 0.2
    } else if (_taxableIncome <= 4500 && _taxableIncome > 1500) {
      return 0.1
    } else if (_taxableIncome <= 1500 && _taxableIncome > 0) {
      return 0.03
    } else {
      return 0
    }
  }

  quickCalculationDeduction () {
    let _taxRate = this.taxRate()
    switch (_taxRate) {
      case 0.45:
        return 13505
      case 0.35:
        return 5005
      case 0.3:
        return 2755
      case 0.25:
        return 1005
      case 0.2:
        return 555
      case 0.1:
        return 105
      default:
        return 0
    }
  }
}
