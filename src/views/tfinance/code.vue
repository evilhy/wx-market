<template>
  <div class="get-id-page">
  </div>
</template>

<script>
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
export default {
  data () {
    return {
      query: {}
    }
  },
  computed: {},
  created () {
    helper.clearSession()
    this.query = getPageQueryObject()
    this.getJsessionId()
  },
  methods: {
    async getJsessionId () {
      let res = await this.$Weixin.wxCallback(this.query.code)
      helper.saveUserInfo({ jsessionId: res.data.jsessionId })
      this.toPage()
    },
    toPage () {
      if (!this.query.state) { // 菜单
        helper.saveShareInfo({ channel: '0' })
        this.$router.replace({name: 'tfinanceList'})
      } else { // 从share进入分享
        let stateObj = JSON.parse(this.query.state)
        let { entId = '', productId = '', fxId = '' } = stateObj
        helper.saveShareInfo({ channel: '2', fxId })
        this.$router.replace({name: 'tfinanceOrder', query: { entId, productId }})
      }
    }
  },
  components: {
  }
}
</script>