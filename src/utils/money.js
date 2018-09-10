import { typeOf } from './assist'

/**
 * 将数字格式化为金额,添加千位分隔符和精度显示
 * toMoney(10002, 2) => '10,002.00'
 * toMoney([1, 2.00, 3102.03]) => ['1', '2', '3,102']
 * toMoney(null) => '0'
 * @export
 * @param {any} number              // 格式化的数字
 * @param {number} [precision=0]    // 精度
 * @param {string} [thousand=',']   // 千位分隔符
 * @returns
 */
export function toMoney (number, precision = 0, thousand = ',') {
  if (typeOf(number) === 'array') {
    return number.map(val => toMoney(val, precision, thousand))
  }

  number = unformat(number)
  let tempPrecision = Math.round(Math.abs(precision))
  precision = Number.isNaN(tempPrecision) ? 0 : tempPrecision

  let negative = number < 0 ? '-' : ''
  let base = parseInt(toFixed(Math.abs(number || 0), precision), 10) + ''
  let mod = base.length > 3 ? base.length % 3 : 0

  return negative + (mod ? base.substr(0, mod) + thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (precision ? '.' + toFixed(Math.abs(number), precision).split('.')[1] : '')
}

/**
 * 将数字格式化为货币格式
 * toCurrency('10023') => '￥10,023.00'
 * toCurrency('10023.234', '$', 3) => '$10,023.234'
 * toCurrency('10023.234', { symbol: '$', precision: 3, thousand: '/' }) => '$10/023.234'
 * toCurrency(null) => '￥0.00'
 * toCurrency(null, { zero: '--' }) => '--'
 * @export
 * @param {any} number
 * @param {string} [symbol='￥']    // 货币符号
 * @param {number} [precision=2]    // 精度
 * @param {string} [thousand=',']   // 千位分隔符
 * @param {string} [zero='%s%v']
 * @returns
 */
export function toCurrency (number, symbol = '￥', precision = 2, thousand = ',', zero = '%s%v') {
  if (typeOf(number) === 'array') {
    return number.map(val => toCurrency(val, symbol, precision, thousand, zero))
  }
  number = unformat(number)

  let defaultOpt = { symbol: '￥', precision: 2, thousand: ',', zero: '%s%v' }
  let opts = typeOf(symbol) === 'object' ? Object.assign({}, defaultOpt, symbol) : { symbol: symbol, precision: precision, thousand: thousand, zero: zero }
  opts.symbol = typeOf(opts.symbol) === 'string' ? opts.symbol : defaultOpt.symbol
  opts.precision = Number.isNaN(Math.round(Math.abs(opts.precision))) ? defaultOpt.precision : Math.round(Math.abs(opts.precision))
  opts.thousand = typeOf(opts.thousand) === 'string' ? opts.thousand : defaultOpt.thousand
  opts.zero = typeOf(symbol.zero) === 'string' ? symbol.zero : defaultOpt.zero

  let useFormat = number > 0 ? '%s%v' : (number < 0 ? '%s-%v' : opts.zero)

  return useFormat.replace('%s', opts.symbol).replace('%v', toMoney(Math.abs(number), opts.precision, opts.thousand))
}

/**
 * 将显示成金额的数据转变为数字
 * unformat('100,000.20') => 100000.2
 * unformat('￥100,000.20') => 100000.2
 * @export
 * @param {any} value
 * @returns
 */
export function unformat (value) {
  if (typeOf(value) === 'array') {
    return value.map(val => unformat(val))
  }
  value = value || 0

  if (typeOf(value) === 'number') return value

  let regex = new RegExp(`[^0-9-.]`, ['g'])
  let unformatted = parseFloat(
    value.toString()
      .replace(/\((?=\d+)(.*)\)/, '-$1')
      .replace(regex, ''))
  return !Number.isNaN(unformatted) ? unformatted : 0
}

/**
 * 处理数字的精度
 * toFixed(0.623, 2) => '0.62'
 * @export
 * @param {any} value
 * @param {number} [precision=0]     // 精度
 * @returns
 */
export function toFixed (value, precision = 0) {
  let tempPrecision = Math.round(Math.abs(precision))
  precision = Number.isNaN(tempPrecision) ? 0 : tempPrecision

  let exponentialForm = Number(unformat(value) + 'e' + precision)
  let rounded = Math.round(exponentialForm)
  let finalResult = Number(rounded + 'e-' + precision).toFixed(precision)
  return finalResult
}
