<template>
  <div class="get-id-page">
    <loading></loading>
  </div>
</template>

<script>
import loading from 'components/loading'
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
      } else { // 分享
        let stateObj = JSON.parse(this.query.state)
        let { entId = '', productId = '', channel = '2', fxId = '' } = this.stateObj
        helper.saveShareInfo({ channel, fxId })
        this.$router.replace({name: 'tfinanceOrder', query: { entId, productId }})
      }
    }
  },
  components: {
    loading
  }
}
</script>