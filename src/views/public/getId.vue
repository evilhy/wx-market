<template>
  <div class="get-id-page">
    <welcome-circle ref="welcome-circle"></welcome-circle>
  </div>
</template>

<script>
import welcomeCircle from 'components/welcomeCircle'
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import decryptInfo from 'utils/decryptInfo'
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
  },
  mounted () {
    this.getJsessionId()
  },
  methods: {
    async getJsessionId () {
      let { code, id } = this.query
      if (id) {
        helper.saveUserInfo({ apppartner: id })
      }
      let res = await this.$Weixin.wxCallback(code, id)
      let data = decryptInfo(res.data, 'bindStatus')
      let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner, themeId } = data

      helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, apppartner, theme: themeId })
      helper.setTheme(themeId)
      if (bindStatus === '0') {
        await this.$refs['welcome-circle'].stopAnimation()
        this.$router.replace({ name: 'bindIdCard' })
      } else {
        helper.saveUserInfo({ idNumber })
        await this.$refs['welcome-circle'].stopAnimation()
        this.toPage(ifPwd)
      }
    },
    toPage (ifPwd) {
      if (!this.query.state) {
        this.$router.replace({ name: 'home' })
      } else {
        let stateObj = JSON.parse(this.query.state)
        let { wageSheetId, groupId } = stateObj
        if (wageSheetId && groupId) {
          helper.saveUserInfo({ groupId })
          if (ifPwd) { // 有密码
            this.$router.replace({ name: 'loginByPwd', query: { nextPage: 'wageIndex', wageSheetId } })
          } else {
            this.$router.replace({ name: 'setQueryCode' })
          }
          return
        }
        this.$router.replace({ name: 'home' })
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  components: {
    welcomeCircle
  }
}
</script>
