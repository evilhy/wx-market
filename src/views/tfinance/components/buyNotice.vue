<template>
  <popup-page title="认购须知" ref="buy-notice" class="buy-notice">
    <div class="content">
      <p><span class="bold">认购时间：</span><span class="bold">{{buyStart | date('Y/m/d H:i:s')}}</span>至<span class="bold">{{buyEnd | date('Y/m/d H:i:s')}}。</span></p>
      <p><span class="bold">预约限制：</span>网点柜台、网银、华夏手机银行App。</p>
      <p><span class="bold">注意事项：</span><span class="stress">首次购买</span>需至华夏银行网点柜台办理<span class="stress">理财签约和风险评估后</span>方可购买，老用户可通过以上3种渠道直接购买。</p>
      <div class="tip" v-if="phone">
        更多业务咨询可点击页面左下角<span class="stress">【咨询】</span>按钮，由您的专属客户经理为您解答。
      </div>
    </div>
  </popup-page>
</template>
<script>
import popupPage from './popupPage'
export default {
  props: {
    buyStart: Number,
    buyEnd: Number,
    phone: String
  },
  data () {
    return {}
  },
  methods: {
    show () {
      this.$refs['buy-notice'].show()
    }
  },
  components: {
    popupPage
  }
}
</script>