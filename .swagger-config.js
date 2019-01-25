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
var getJsapiSignature = require('./json/weixin.getJsapiSignature.json')
var managerInfo = require('./json/manager.managerInfo.json')
var distribute = require('./json/manager.distribute.json')
var elifeGetUserInfo = require('./json/elife.getUserInfo.json')
var elifeJoinActivity = require('./json/elife.joinActivity.json')
var elifeXUser = require('./json/elife.xuser.json')
var elifeXJoin = require('./json/elife.xjoin.json')
var tfinanceList = require('./json/tfinance.list.json')
var tfinanceProduct = require('./json/tfinance.product.json')
var intentionList = require('./json/tfinance.intentionList.json')
var operateList = require('./json/tfinance.operateList.json')
var tfinanceIntent = require('./json/tfinance.intent.json')
var tfinanceIntentInfo = require('./json/tfinance.intentInfo.json')
var tfinanceUserInfo = require('./json/tfinance.userInfo.json')
var elifePlantform710001 = require('./json/elife.plantform710001.json')
var elifePlantform710002 = require('./json/elife.plantform710002.json')
var setPwd = require('./json/inside.setPwd.json')
var checkCard = require('./json/roll.checkCard.json')
var bindTel = require('./json/inside.rz.json')
var userInfo = require('./json/roll.emp.json')
var checkPwd = require('./json/roll.checkPwd.json')
var empEnt = require('./json/roll.empEnt.json')
var empCard = require('./json/roll.empCard.json')
var empCardLog = require('./json/roll.empCardLog.json')
var updBankCard = require('./json/inside.updBankCard.json')
var checkPhoneCode = require('./json/inside.checkPhoneCode.json')
var updPhone = require('./json/inside.updPhone.json')
var entPhone = require('./json/roll.entPhone.json')
var entUser = require('./json/roll.entUser.json')
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
      '/weixin/getJsapiSignature': {
        get: getJsapiSignature
      },
      '/manager/managerInfo': {
        get: managerInfo
      },
      '/manager/distribute': {
        post: distribute
      },
      '/elife': {
        get: elifeGetUserInfo
      },
      '/elife': {
        post: elifeJoinActivity
      },
      '/tfinance/list': {
        get: tfinanceList
      },
      '/tfinance/product': {
        get: tfinanceProduct
      },
      '/tfinance/intentionList': {
        get: intentionList
      },
      '/tfinance/operateList': {
        get: operateList
      },
      '/tfinance/userInfo': {
        get: tfinanceUserInfo
      },
      '/tfinance/intent': {
        post: tfinanceIntent
      },
      '/tfinance/intentInfo': {
        get: tfinanceIntentInfo
      },
      '/elife/xuser': {
        get: elifeXUser
      },
      '/elife/xjoin': {
        post: elifeXJoin
      },
      '/inside/setPwd': {
        post: setPwd
      },
      '/roll/checkCard': {
        get: checkCard
      },
      '/inside/rz': {
        post: bindTel
      },
      '/roll/emp': {
        get: userInfo
      },
      '/roll/checkPwd': {
        get: checkPwd
      },
      '/roll/empEnt': {
        get: empEnt
      },
      '/roll/empCard': {
        get: empCard
      },
      '/roll/empCardLog': {
        get: empCardLog
      },
      '/inside/updBankCard': {
        post: updBankCard
      },
      '/inside/checkPhoneCode': {
        post: checkPhoneCode
      },
      '/inside/updPhone': {
        post: updPhone
      },
      '/roll/entPhone': {
        get: entPhone
      },
      '/roll/entUser': {
        get: entUser
      }
    }
  },{
    baseURL: 'https://demowisdom.wisales.cn:8213/easy-life',
    paths: {
      '/plantform710001.json': {
        post: elifePlantform710001
      },
      '/plantform710002.json': {
        post: elifePlantform710002
      }
    }
  }],
  unknown: {}
}
