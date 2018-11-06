<template>
  <div class="activity-rule-wrap">
    <div class="rule-title white-box"
         @click="showRuleDetail">
      <span class="">活动规则</span>
      <span class="more">查看详情<span class="triangle"></span></span>
    </div>
    <popup-page title="活动规则" ref="rule-detail" class="rule-detail">
      <div class="tip">
        活动共分为预约和认购两个阶段，预约期完成预约后在认购期才有资格认购理财产品，否则无法完成认购。
      </div>
      <div class="item-title">预约期</div>
      <div class="content">
        <p><span class="bold">时间：</span><span class="bold">{{orderStart | date('Y/m/d H:i:s')}}</span>至<span class="bold">{{orderEnd | date('Y/m/d H:i:s')}}。</span></p>
        <p><span class="bold">预约限制：</span>放薪管家微信端通过身份认证的用户<span class="stress">（关注+完成身份认证）</span>。</p>
        <p><span class="bold">加息规则：</span>邀请同一公司员工，且被邀请人同样为微信端完成认证用户。</p>
      </div>
      <div class="item-title">认购期</div>
      <div class="content">
        <p><span class="bold">时间：</span><span class="bold">{{buyStart | date('Y/m/d H:i:s')}}</span>至<span class="bold">{{buyStart | date('Y/m/d H:i:s')}}。</span></p>
        <p><span class="bold">认购渠道：</span>网点柜台、网银、华夏手机银行App、华夏社区App。</p>
        <p><span class="bold">认购须知：</span>首次购买需至华夏银网网点柜台办理理财签约和风险评估后方可购买，老用户可通过以上4种渠道直接购买。</p>
      </div>
    </popup-page>
  </div>
</template>
<script>
import popupPage from './popupPage'
export default {
  props: {
    orderStart: Number,
    orderEnd: Number,
    buyStart: Number,
    buyEnd: Number
  },
  data () {
    return {}
  },
  methods: {
    showRuleDetail () {
      this.$refs['rule-detail'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>