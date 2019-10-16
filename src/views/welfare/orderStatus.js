import sysConfig from 'utils/constant'
export default {
  computed: {
    statusInfo () {
      /* ORDERCANCEL("订单取消"),
         ORDERFAIL("下单失败"),
         PREPAYMENT("下单成功,待支付"),
         PAYFAIL("支付失败"),
         PAYPROCESSING("支付中"),
         MERPREPARE("支付成功,商户待下单"),
         MERALREADY("商户已发货"),
         MERCOMPLETE("客户已收货"),
         MERPROCESSING("商户下单处理中"),
         MERORDERSUCCESS("商户下单成功"),
         MERFAIL("商户处理失败")
       */
      let { itemCatId, orderDealStatus } = this.orderInfo
      let { phoneCharge, phoneData, starbucks, videoMember, viewingTicket, oilCard } = sysConfig
      if (!itemCatId) return {}
      switch (itemCatId) {
        case phoneCharge: // 话费
        case phoneData: // 流量
          return this.getPhoneOrderStatusInfo(orderDealStatus)
        case videoMember: // 视频会员
        case viewingTicket: // 观影券
        case oilCard: // 油卡
        case starbucks: // 星巴克 
          return this.getVirtualOrderStatusInfo(orderDealStatus)
        default: // 实物
          return this.getRealOrderStatusInfo(orderDealStatus)
      }
    }
  },
  methods: {
    getPhoneOrderStatusInfo (orderDealStatus) {
      switch (orderDealStatus) {
        case 'MERCOMPLETE':
          return {
            status: 'success',
            desc: '充值成功'
          }
        case 'PAYFAIL':
        case 'MERFAIL':
          return {
            status: 'fail',
            desc: '充值失败'
          }
        default:
          return {
            status: 'waiting',
            desc: '充值中'
          }
      }
    },
    getVirtualOrderStatusInfo (orderDealStatus) {
      switch (orderDealStatus) {
        case 'MERCOMPLETE':
          return {
            status: 'success',
            desc: '成功'
          }
        case 'PAYFAIL':
        case 'MERFAIL':
          return {
            status: 'fail',
            desc: '失败'
          }
        default:
          return {
            status: 'waiting',
            desc: '处理中'
          }
      }
    },
    getRealOrderStatusInfo (orderDealStatus) {
      switch (orderDealStatus) {
        case 'PREPAYMENT':
          return {
            status: 'success',
            desc: '下单成功'
          }
        case 'PAYFAIL':
        case 'MERFAIL':
          return {
            status: 'fail',
            desc: '下单失败'
          }
        case 'MERALREADY':
          return {
            status: 'shipped',
            desc: '已发货'
          }
        case 'MERCOMPLETE':
          return {
            status: 'received',
            desc: '已收货'
          }
        default:
          return {
            status: 'waiting',
            desc: '待发货'
          }
      }
    }
  }
}