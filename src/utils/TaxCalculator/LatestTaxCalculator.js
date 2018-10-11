/**
 * Created by duy on 2018/10/10 15:39.
 * @description  2018新版个税计算器
 */

import TaxCalculator from './TaxCalculator'

export default class LatestTaxCalculator extends TaxCalculator {

  taxBase = 5000

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
}
