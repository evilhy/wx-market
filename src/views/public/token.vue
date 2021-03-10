<template>
  <div class="get-id-page">
  </div>
</template>

<script>
import loading from 'utils/loading'
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
export default {
  data () {
    return {
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    helper.clearSession()
    loading.show({ type: 'bounce', parent: document.querySelector('#app') })
    this.getJsessionId()
  },
  methods: {
    async getJsessionId () {
      let { accessToken = '' } = getPageQueryObject()
      let res = await this.$Merchant.callback(accessToken)

      let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner } = res.data
      helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner })
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>