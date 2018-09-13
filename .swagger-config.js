const entEmp = require('./json/roll.entEmp.json')
const sendCode = require('./json/inside.sendCode.json')
const bindWX = require('./json/roll.bindWX.json')
const empInfo = require('./json/roll.empInfo.json')
const groupList = require('./json/roll.groupList.json')
const index = require('./json/roll.index.json')
const invoice = require('./json/roll.invoice.json')
const isBind = require('./json/roll.isBind.json')
const receipt = require('./json/roll.receipt.json')
const wageDetail = require('./json/roll.wageDetail.json')
const wageList = require('./json/roll.wageList.json')
const wageTrend = require('./json/roll.wageTrend.json')
module.exports = {
  openApi: [{
    baseURL: 'http://10.5.1.92:8080/rest',
    paths: {
      '/roll/entEmp': {
        get: entEmp
      },
      '/inside/sendCode': {
        post: sendCode
      },
      '/roll/bindWX': {
        post: bindWX
      },
      '/roll/empInfo': {
        get: empInfo
      },
      '/roll/groupList': {
        get: groupList
      },
      '/roll/index': {
        get: index
      },
      '/roll/invoice': {
        get: invoice
      },
      '/roll/isBind': {
        get: isBind
      },
      '/roll/receipt': {
        post: receipt
      },
      '/roll/wageDetail': {
        get: wageDetail
      },
      '/roll/wageList': {
        get: wageList
      },
      '/roll/wageTrend': {
        get: wageTrend
      }
    }
  }],
  unknown: {}
}
