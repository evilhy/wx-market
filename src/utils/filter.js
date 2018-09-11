import { typeOf } from './assist'
import { toFixed, unformat } from './money'
import sysConfig from './constant'

function date (timeVal, format = 'Y-m-d H:i:s') {
  let time = {}
  if (typeOf(timeVal) === 'string') {
    time.year = timeVal.substring(0, 4)
    time.month = timeVal.substring(4, 6)
    time.date = timeVal.substring(6, 8)
    if (timeVal.length <= 8) {
      time.hours = '00'
      time.minutes = '00'
      time.seconds = '00'
    } else {
      time.hours = timeVal.substring(8, 10)
      time.minutes = timeVal.substring(10, 12)
      time.seconds = timeVal.substring(12, 14)
    }
    return format.replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.date)
      .replace('H', time.hours)
      .replace('i', time.minutes)
      .replace('s', time.seconds)
  } else if (typeOf(timeVal) === 'date' || typeOf(timeVal) === 'number') {
    if (typeOf(timeVal) === 'number') {
      timeVal = new Date(timeVal)
    }
    time.year = timeVal.getFullYear()
    time.month = timeVal.getMonth() + 1
    time.date = timeVal.getDate()
    time.hours = timeVal.getHours()
    time.minutes = timeVal.getMinutes()
    time.seconds = timeVal.getSeconds()
    Object.keys(time).forEach((key) => {
      time[key] = time[key].toString().padStart(2, '0')
    })
    return format.replace('Y', time.year)
      .replace('m', time.month)
      .replace('d', time.date)
      .replace('H', time.hours)
      .replace('i', time.minutes)
      .replace('s', time.seconds)
  } else {
    return timeVal
  }
}
function money (number, precision = 0, thousand = ',') {
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
function fundType (str = '') {
  let fundItem = sysConfig.account_money_type.filter(item => item.value === str)
  return fundItem.length ? fundItem[0].label : ''
}
function serviceStatus (status) {
  return sysConfig.service_status_info[status]
}

function monthZh (month, hasUnit = false) {
  if (typeOf(month) !== 'string' && typeOf(month) !== 'number') return ''
  let zh = sysConfig.month_zh[month.toString()]
  return zh ? (zh + (hasUnit ? '份' : '')) : month.toString()
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
export default {
  date: date,
  money: money,
  currency: currency,
  deteData: deteData,
  banCard: banCard,
  banCardLast: banCardLast,
  fundType: fundType,
  serviceStatus: serviceStatus,
  monthZh: monthZh,
  msgTime: msgTime,
  bankSpace: bankSpace
}
