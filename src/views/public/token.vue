<template>
  <div class="token-page"></div>
</template>

<script>
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import sysConfig from 'utils/constant'

export default {
  data() {
    return {
      callbackInfo: {
        NINGXIA: '$Nx',
        NEWUP: '$Merchant'
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    helper.clearSession()
    helper.setTheme(sysConfig.otherBankTheme)
    this.getJsessionId()
  },
  methods: {
    async getJsessionId() {
      const { accessToken = '', appPartner = '' } = getPageQueryObject()
      const httpM = this.callbackInfo[appPartner || 'NEWUP']
      const res = await this[httpM].callback(accessToken)
      const { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner } = res.data
      helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner })
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>
