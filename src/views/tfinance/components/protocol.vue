<template>
<popup-page title="华夏银行同事理财团活动用户协议" ref="protocol-detail" class="protocol-popup">
  <div class="protocol-detail">
    <p class="protocol-item">华夏银行股份有限公司个人借记卡客户（下称“客户”）与签约借记卡开户网点所属华夏银行股份有限公司分支机构（下称“银行”）就办理“团购营销活动”达成如下协议。</p>
    <p class="protocol-item">1.“团购营销活动”是华夏银行股份有限公司在适用的柜台、电子银行渠道面向我行借记卡客户开展的团购专享产品销售活动。团购活动中，华夏银行客户经理在微信渠道活动页面开团并分享专属链接，邀请客户参团；客户通过微信专属链接参加团购活动。</p>
    <p class="protocol-item">2.本协议中，除非上下文另有解释或文义另有所指，下列词语具有以下含义：</p>
    <p class="protocol-item protocol-child-item">（1）客户：华夏银行股份有限公司借记卡持卡人。</p>
    <p class="protocol-item protocol-child-item">（2）开团：华夏银行客户经理在微信渠道生成包含该华夏银行客户经理二维码等信息的团购产品图片或专属链接，并分享给客户后表示开团。</p>
    <p class="protocol-item protocol-child-item">（3）参团：具有团购意向的客户通过华夏银行客户经理分享的专属链接，在活动页面输入姓名、身份证号、预约金额等字段；经银行确认符合团购条件的，即成功参团。</p>
    <p class="protocol-item protocol-child-item">（4）达标团员：开团、参团后，达到约定人数，团中客户可成为达标团员，享有团购产品的购买权利。</p>
    <p class="protocol-item protocol-child-item">（5）“微信渠道”，是指华夏银行股份有限公司委托开科唯识开发的“放薪经理”微信预约渠道。</p>
    <p class="protocol-item protocol-child-item">（6）团购专享产品协议，是指组团时客户签署的团购专享产品的产品合同。</p>
    <p class="protocol-item protocol-child-item">（7）工作日：银行开门营业日，不包括法定节假日和休息日（因节假日调整而营业的除外）。</p>
    <p class="protocol-item">3.“团购营销活动”项下，每一个团购达标团员人数和成团时间由华夏银行确定。</p>
    <p class="protocol-item">4.活动时间内，华夏银行客户经理可通过“活动详情”页面查看团员达标情况。但成团申请应不迟于团购活动的预约时间，否则华夏银行客户经理不能发起成团申请。</p>
    <p class="protocol-item">5.华夏银行客户经理分享团购预约二维码发起成团申请的，银行将实时确认成团结果。每个团按成团后该团购达标团员具体人数确定不同产品的购买权利，不同类型的团购适用不同的团购专享产品。</p>
    <p class="protocol-item">6.成团时客户购买的团购专享产品投资期限由华夏银行确定（不含产品到期日或产品提前终止日，如遇产品提前终止， 或产品成立日或产品到期日调整，则产品投资期限由实际投资期限决定），除产品协议另有约定外，产品投资期限内客户不得提前终止该团购专享产品。</p>
    <p class="protocol-item">7.团购活动中，如客户利用非银行指定的电子银行渠道参加活动或其他作弊手段获得奖励，银行有权取消客户应得或已获得的奖励。</p>
    <p class="protocol-item">8.银行有权对本协议及活动细则做出单方面调整，在不违反法律、法规、规章和监管规定的强制性规范的前提下，银行有权提前在门户网站或手机银行公告。若客户对本协议及活动细则的修改有异议的，有权在公告执行前终止本协议及活动细则，若客户在公告期限届满未终止本协议及活动细则，则被视为接受公告内容。</p>
    <p class="protocol-item">9.客户同意并确认：</p>
    <p class="protocol-item">客户签署本协议，即表示同意签署拟购买团购专享产品所对应的产品协议，在相应页面勾选“我已阅读并同意《产品协议》，并充分了解并知晓本产品风险，本次仅限于预约阶段，不涉及购买环节，请您在我行柜台、电子渠道购买时详细阅读产品介绍和风险提示。</p>
  </div>
</popup-page>
</template>
<script>
import popupPage from './popupPage'
export default {
  data () {
    return {
      flag: false
    }
  },
  methods: {
    open () {
      this.$refs['protocol-detail'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>