import timeUtil from 'utils/time'
import MoneyUtil from 'utils/money'

export function date(timeVal, format = 'Y-m-d H:i:s') {
  return timeUtil.format(timeVal, format)
}
export function money(number, precision = 2, thousand = ',') {
  return MoneyUtil.toMoney(number, precision, thousand)
}
function numberToChinese(money) {
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let cnIntRadice = ['', '拾', '佰', '仟']
  let cnIntUnits = ['', '万', '亿', '兆']
  let cnDecUnits = ['角', '分', '毫', '厘']
  let cnInteger = '整'
  let cnIntLast = '元'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (!money) {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超额处理
    return '金额超出限制'
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
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
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
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

function bankSpace(str = '') {
  return str
    .replace(/\s/g, '')
    .replace(/[^\d]/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export default {
  date,
  money,
  numberToChinese,
  bankSpace
}