import { typeOf } from './assist'
import Money from './money'
import TimeInstance from './time'
import sysConfig from './constant'

function date(timeVal, format = 'Y-m-d H:i:s') {
  return TimeInstance.format(timeVal, format)
}

export function money(number, precision = 2, thousand = ',') {
  const MoneyUtil = new Money()
  return MoneyUtil.toMoney(number, precision, thousand)
}

function banCard(time) {
  return time.replace(/s/g, '').replace(/(.{4})/g, '$1 ')
}

function banCardLast(card) {
  return card.substr(card.length - 4, card.length)
}

function monthZh(month, hasUnit = false) {
  if (typeOf(month) !== 'string' && typeOf(month) !== 'number') return ''
  const zh = sysConfig.monthZh[month.toString()]
  return zh ? zh + (hasUnit ? '份' : '') : month.toString()
}

function pastTime(pastTimeVal, nowTimeVal = new Date()) {
  const minutesGap = TimeInstance.getTimeDiff(pastTimeVal, nowTimeVal, 'i')
  if (minutesGap < 1) {
    return '刚刚'
  }
  if (minutesGap >= 1 && minutesGap < 60) {
    return `${minutesGap}分钟前`
  }
  if (minutesGap >= 60 && minutesGap < 1440) {
    return `${Math.floor(minutesGap / 60)}小时前`
  }
  return TimeInstance.format(pastTimeVal, 'm月d号')
}
function nameStar(name = '') {
  if (typeOf(name) !== 'string' || !name.length) return ''
  return `${name.substring(0, 1)}**`
}
function msgTime(dateStr = '') {
  if (!dateStr) return ''
  const now = new Date()
  const today = date(now, 'Ymd')
  const yesterday = date(new Date(now.getTime() - 1000 * 60 * 60 * 24), 'Ymd')
  if (dateStr.substring(0, 8) === today || dateStr.substring(0, 8) === yesterday) {
    return dateStr.substring(0, 8) === today ? date(dateStr, 'H:i') : `昨天 ${date(dateStr, 'H:i')}`
  }
  if (dateStr.substring(0, 4) === today.substring(0, 4)) {
    return date(dateStr, 'm-d H:i')
  }
  return date(dateStr, 'Y-m-d H:i')
}
function bankSpace(str = '') {
  return str
    .replace(/\s/g, '')
    .replace(/[^\d]/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ')
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
function accountStar(account) {
  if (!account) return ''
  return `${account.substring(0, 4)}********${account.substring(account.length - 4, account.length)}`
}

function numberToChinese(amt) {
  // 汉字的数字
  const cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  const cnIntRadice = new Array('', '拾', '佰', '仟')
  const cnIntUnits = new Array('', '万', '亿', '兆')
  const cnDecUnits = new Array('角', '分', '毫', '厘')
  const cnInteger = '整'
  const cnIntLast = '元'
  // 最大处理的数字
  const maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (!amt) {
    return ''
  }
  amt = parseFloat(amt)
  if (amt >= maxNum) {
    // 超额处理
    return '金额超出限制'
  }
  if (amt === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  amt = amt.toString()
  if (amt.indexOf('.') === -1) {
    integerNum = amt
    decimalNum = ''
  } else {
    parts = amt.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

export default {
  date,
  money,
  banCard,
  banCardLast,
  monthZh,
  pastTime,
  nameStar,
  msgTime,
  bankSpace,
  phoneStar,
  star,
  accountStar,
  numberToChinese
}
