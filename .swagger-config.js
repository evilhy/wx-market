var entEmp = require('./json/roll.entEmp.json')
var sendCode = require('./json/inside.sendCode.json')
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
var advertising = require('./json/system.advertising.rotation.json')
var merchantToken = require('./json/merchant.callback.json')
var njToken = require('./json/nj.callback.json')
var wActivityList = require('./json/welfare.activityList.json')
var wActivityDetail = require('./json/welfare.activityDetail.json')
var wGoodsList = require('./json/welfare.goodsList.json')
var wGoodsDetail = require('./json/welfare.goodsDetail.json')
var welfareExchange = require('./json/welfare.exchange.json')
var welfareOrderList = require('./json/welfare.orderList.json')
const addressList = require('./json/welfare.addressList.json')
const baseQuery = require('./json/area.baseQuery.json')
const province = require('./json/area.province.json')
const city = require('./json/area.city.json')
const county = require('./json/area.county.json')
const townQuery = require('./json/area.townQuery.json')
const addressDetail = require('./json/addressDetail.json')
const welfareOrderDetail = require('./json/welfare.orderDetail.json')
const welfareOrderTrack = require('./json/welfare.orderTrack.json')
const barrageList = require('./json/barrageList.json')
const wUserInfo = require('./json/wUserInfo.json')
const openingTips = require('./json/manager.openingTips.json')
const crateNumericKeypad = require('./json/password.crateNumericKeypad.json')
const queryHandPassword = require('./json/password.queryHandPassword.json')
const empCardAndBalance = require('./json/wallet.empCardAndBalance.json')
const empEntList = require('./json/inside.empEntList.json')
const cardCount = require('./json/wisales.cardCount.json')
const bulletInfo = require('./json/news.bulletInfo.json')
const statisticInfo = require('./json/news.statisticInfo.json')
const news = require('./json/news.json')
const bill = require('./json/bill.json')
const nxCallback = require('./json/nx.callback.json')
const balance = require('./json/wallet.balance.json')
const withdrawalLedgerPage = require('./json/wallet.withdrawalLedgerPage.json')
const withdrawalLedgerDetail = require('./json/wallet.withdrawalLedgerDetail.json')
const withdrawalRecordDetail = require('./json/wallet.withdrawalRecordDetail.json')
const selectWithdrawalStatusEnum = require('./json/select.WithdrawalStatusEnum.json')
const checkCardBin = require('./json/roll.checkCardBin.{cardNo}.json')
var nxCallback = require('./json/nx.callback.json')

module.exports = {
  openApi: [{
    baseURL: 'https://sitgateway.cardpu.com/payroll',
    paths: {
      '/base/WithdrawalStatusEnum/dictItem': {
        get: selectWithdrawalStatusEnum
      },
      '/news/operate': {
        post: null
      },
      '/news': {
        post: news
      },
      '/news/statisticInfo': {
        get: statisticInfo
      },
      '/news/bulletInfo': {
        get: bulletInfo
      },
      '/inside/theme': {
        post: null
      },
      '/wisales/countWelfareEmpTicket': {
        get: cardCount
      },
      '/inside/empEntList': {
        get: empEntList
      },
      '/wallet/empCardAndBalance': {
        get: empCardAndBalance
      },
      '/wallet/balance': {
        get: balance
      },
      '/wallet/withdrawalLedgerPage': {
        post: withdrawalLedgerPage
      },
      '/wallet/withdrawalLedgerDetail/{withdrawalLedgerId}': {
        get: withdrawalLedgerDetail
      },
      '/wallet/withdrawalRecordDetail/{withdrawalLedgerId}': {
        get: withdrawalRecordDetail
      },
      '/wallet/withdraw': {
        post: null
      },
      '/password/queryHandPassword': {
        get: queryHandPassword
      },
      '/password/checkPassword': {
        post: null
      },
      '/password/savePassword': {
        post: null
      },
      '/password/closeHandPassword': {
        get: null
      },
      '/password/crateNumericKeypad': {
        get: crateNumericKeypad
      },
      '/wisales/welfareActivity/listByPayRoll': {
        get: wActivityList
      },
      '/wisales/welfareActivity/detailByPayRoll': {
        get: wActivityDetail
      },
      '/wisales/welfareGoods/list': {
        get: wGoodsList
      },
      '/wisales/welfareGoods/detail': {
        get: wGoodsDetail
      },
      '/wisales/welfareCustOrder/welfareExchange': {
        post: welfareExchange
      },
      '/wisales/welfareCustOrder/welfareExchangePhone': {
        post: welfareExchange
      },
      '/wisales/welfareCustOrder/welfareExchangeGoods': {
        post: welfareExchange
      },
      '/wisales/welfareCust/custOrderList': {
        get: welfareOrderList
      },
      '/wisales/welfareCust/address/get': {
        get: addressList
      },
      '/wisales/welfareCust/area/baseQuery': {
        get: baseQuery
      },
      '/wisales/welfareCust/area/province': {
        get: province
      },
      '/wisales/welfareCust/area/city': {
        get: city
      },
      '/wisales/welfareCust/area/county': {
        get: county
      },
      '/wisales/welfareCust/area/townQuery': {
        get: townQuery
      },
      '/wisales/welfareCust/address/delete': {
        post: null
      },
      '/wisales/welfareCust/address/save': {
        post: null
      },
      '/wisales/welfareCust/address/getById': {
        get: addressDetail
      },
      '/wisales/welfareCust/custOrderDetail': {
        get: welfareOrderDetail
      },
      '/wisales/welfareCust/orderTrack': {
        get: welfareOrderTrack
      },
      '/inside/sendCode': {
        post: sendCode
      },
      '/roll/entEmp': {
        post: entEmp
      },
      '/inside/bindWX': {
        post: {}
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
      '/roll/saveSigned': {
        post: null
      },
      '/roll/wageList': {
        get: wageList
      },
      '/roll/wageTrend': {
        get: wageTrend
      },
      '/wechat/wxCallback': {
        post: wxCallback
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
        get: elifeGetUserInfo,
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
        post: checkCard
      },
      '/inside/rz': {
        post: bindTel
      },
      '/roll/emp': {
        get: userInfo
      },
      '/roll/checkPwd': {
        post: checkPwd
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
      },
      '/advertising/rotation': {
        get: advertising
      },
      '/merchant/callback': {
        get: merchantToken
      },
      '/nx/callback': {
        get: nxCallback
      },
      '/nj/callback': {
        get: njToken
      },
      '/virus': {
        get: barrageList,
        post: {
          rankNo: 102,
          total: 103
        }
      },
      '/virus/userInfo': {
        get: wUserInfo
      },
      '/manager/openingTips': {
        get: openingTips
      },
      '/bill': {
        get: bill
      },
      '/roll/checkCardBin/{cardNo}': {
        get: checkCardBin
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
