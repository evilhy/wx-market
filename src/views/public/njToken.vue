<template>
  <div class="get-id-page">
  </div>
</template>

<script>
import loading from 'utils/loading'
import helper from 'utils/helper'
import storage from 'utils/storage'
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
    helper.setTheme('pink')
    loading.show({ type: 'bounce', parent: document.querySelector('#app') })
    this.getJsessionId()
  },
  beforeDestroy () {
    loading.hide()
  },
  methods: {
    async getJsessionId () {
      let { accessToken = '', yearMonth = '' } = getPageQueryObject()
      let res = await this.$Nj.callback(accessToken)
      let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner, entList = [] } = res.data
      switch (entList.length) {
        case 0: // 游客
          this.$router.replace({ name: 'noWage' })
          break 
        case 1: // 单企业
          let { entId = '', groupId = '' } = entList[0]
          helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner, groupId, entId })
          this.$router.replace({ name: 'wageList', query: { groupId, yearMonth } })
          break
        default: // 多企业
          helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner })
          storage.setSession('entList', entList)
          this.$router.replace({ name: 'entWageList' })
      }
    }
  },
  components: {
    loading
  }
}
</script>