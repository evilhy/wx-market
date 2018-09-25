var entEmp = require('./json/roll.entEmp.json')
var sendCode = require('./json/inside.sendCode.json')
var bindWX = require('./json/inside.bindWX.json')
var empInfo = require('./json/roll.empInfo.json')
var groupList = require('./json/roll.groupList.json')
var index = require('./json/roll.index.json')
var invoice = require('./json/roll.invoice.json')
var receipt = require('./json/inside.receipt.json')
var read = require('./json/inside.read.json')
var wageDetail = require('./json/roll.wageDetail.json')
var wageList = require('./json/roll.wageList.json')
var wageTrend = require('./json/roll.wageTrend.json')
var wxCallback = require('./json/weixin.wxCallback.json')
var managerInfo = require('./json/manager.managerInfo.json')
var distribute = require('./json/manager.distribute.json')
module.exports = {
  openApi: [{
    baseURL: 'http://10.5.1.71:8080/rest',
    paths: {
      '/roll/entEmp': {
        get: entEmp
      },
      '/inside/sendCode': {
        post: sendCode
      },
      '/inside/bindWX': {
        post: bindWX
      },
      '/inside/read': {
        post: read
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
      '/inside/receipt': {
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
      },
      '/weixin/wxCallback': {
        get: wxCallback
      },
      '/manager/managerInfo': {
        get: managerInfo
      },
      '/manager/distribute': {
        post: distribute
      }
    }
  }],
  unknown: {}
}
