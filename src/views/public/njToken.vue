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
    loading.show({ type: 'bounce', parent: document.querySelector('#app') })
    helper.clearSession()
    this.getJsessionId()
  },
  methods: {
    async getJsessionId () {
      let { accessToken = '', yearMonth = '' } = getPageQueryObject()
      let res = await this.$Nj.callback(accessToken)
      let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner, groupId, entId } = res.data
      helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner, groupId, entId })
      helper.setTheme('pink')
      this.$router.replace({ name: 'wageList', query: { groupId, yearMonth } })
    }
  },
  components: {
    loading
  }
}
</script>