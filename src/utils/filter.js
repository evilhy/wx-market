import { typeOf } from './assist'
import { toFixed, unformat } from './money'
import Time from './time'
import sysConfig from './constant'
const TimeInstance = new Time()
function date (timeVal, format = 'Y-m-d H:i:s') {
  return TimeInstance.format(timeVal, format)
}
function money (number, precision = 2, thousand = ',') {
  if (typeOf(number) === 'array') {
    return number.map(val => money(val, precision, thousand))
  }

  number = unformat(number)
  let tempPrecision = Math.round(Math.abs(precision))
  precision = Number.isNaN(tempPrecision) ? 0 : tempPrecision

  let negative = number < 0 ? '-' : ''
  let base = parseInt(toFixed(Math.abs(number || 0), precision), 10) + ''
  let mod = base.length > 3 ? base.length % 3 : 0

  return negative + (mod ? base.substr(0, mod) + thousand : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (precision ? '.' + toFixed(Math.abs(number), precision).split('.')[1] : '')
}
function currency (number, symbol = '￥', precision = 2, thousand = ',', zero = '%s%v') {
  if (typeOf(number) === 'array') {
    return number.map(val => currency(val, symbol, precision, thousand, zero))
  }
  number = unformat(number)

  let defaultOpt = { symbol: '￥', precision: 2, thousand: ',', zero: '%s%v' }
  let opts = typeOf(symbol) === 'object' ? Object.assign({}, defaultOpt, symbol) : { symbol: symbol, precision: precision, thousand: thousand, zero: zero }
  opts.symbol = typeOf(opts.symbol) === 'string' ? opts.symbol : defaultOpt.symbol
  opts.precision = Number.isNaN(Math.round(Math.abs(opts.precision))) ? defaultOpt.precision : Math.round(Math.abs(opts.precision))
  opts.thousand = typeOf(opts.thousand) === 'string' ? opts.thousand : defaultOpt.thousand
  opts.zero = typeOf(symbol.zero) === 'string' ? symbol.zero : defaultOpt.zero

  let useFormat = number > 0 ? '%s%v' : (number < 0 ? '%s-%v' : opts.zero)

  return useFormat.replace('%s', opts.symbol).replace('%v', money(Math.abs(number), opts.precision, opts.thousand))
}
function deteData (day) {
  return day.substring(2, 4) + '/' + day.substring(4, 6) + '/' + day.substring(6, 8)
}
function banCard (time) {
  return time.replace(/s/g, '').replace(/(.{4})/g, '$1 ')
}

function banCardLast (card) {
  return card.substr(card.length - 4, card.length)
}

function monthZh (month, hasUnit = false) {
  if (typeOf(month) !== 'string' && typeOf(month) !== 'number') return ''
  let zh = sysConfig.monthZh[month.toString()]
  return zh ? (zh + (hasUnit ? '份' : '')) : month.toString()
}

function pastTime (pastTimeVal, nowTimeVal = new Date()) {
  let minutesGap = TimeInstance.getTimeDiff(pastTimeVal, nowTimeVal, 'i')
  if (minutesGap < 1) {
    return '刚刚'
  } else if (minutesGap >= 1 && minutesGap < 60) {
    return `${minutesGap}分钟前`
  } else if (minutesGap >= 60 && minutesGap < 1440) {
    return `${Math.floor(minutesGap / 60)}小时前`
  } else {
    return TimeInstance.format(pastTimeVal, 'm月d号')
  }
}
function nameStar (name = '') {
  if (typeOf(name) !== 'string' || !name.length) return ''
  return name.substring(0, 1) + '**'
}
function msgTime (dateStr = '') {
  if (!dateStr) return
  let now = new Date()
  let today = date(now, 'Ymd')
  let yesterday = date(new Date(now.getTime() - 1000 * 60 * 60 * 24), 'Ymd')
  if (dateStr.substring(0, 8) === today || dateStr.substring(0, 8) === yesterday) {
    return dateStr.substring(0, 8) === today ? date(dateStr, 'H:i') : ('昨天 ' + date(dateStr, 'H:i'))
  } else {
    if (dateStr.substring(0, 4) === today.substring(0, 4)) {
      return date(dateStr, 'm-d H:i')
    } else {
      return date(dateStr, 'Y-m-d H:i')
    }
  }
}
function bankSpace (bankStr = '') {
  let bankArr = []
  for (let i = 0; i < bankStr.length; i = i + 4) {
    bankArr.push(bankStr.substring(i, i + 4))
  }
  return bankArr.join(' ')
}
function phoneStar(phone = '') {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}
function star(str = '') {
  if (str.length < 9) {
    return str
  }
  return str.replace(/^(.{6})(?:\d+)(.{4})$/, '$1******$2')
}
export default {
  date,
  money,
  currency,
  deteData,
  banCard,
  banCardLast,
  monthZh,
  pastTime,
  nameStar,
  msgTime,
  bankSpace,
  phoneStar,
  star
}
