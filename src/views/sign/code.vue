<template>
  <div class=""></div>
</template>

<script>
import { getPageQueryObject } from 'utils/assist'
import Loading from 'utils/loading'
import helper from 'utils/helper.js'
import decryptInfo from 'utils/decryptInfo'

export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  created() {
    this.loadingInstance = new Loading({ type: 'square' })
    helper.clearSession('payrollUserInfo')
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    async getUserInfo() {
      const { code } = getPageQueryObject()
      const res = await this.$Weixin.wxCallback(code, 'FXGJ')
      const data = decryptInfo(res.data, 'bindStatus')
      const { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner, themeId } = data

      helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, apppartner })
      helper.setTheme(themeId)
      if (bindStatus === '0') {
        this.$router.replace({ name: 'serviceAttention' })
      } else {
        helper.saveUserInfo({ idNumber })
        this.$router.replace({ name: 'signAttest' })
      }
    }
  },
  beforeDestroy() {
    if (this.loadingInstance) {
      this.loadingInstance.hide()
    }
  }
}
</script>
