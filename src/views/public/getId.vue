<template>
  <div class="get-id-page">
    <img src="../../assets/img/logo.png" alt="">
  </div>
</template>

<script>
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import decryptInfo from 'utils/decryptInfo'
import loading from 'utils/loading'
export default {
  data () {
    return {
      query: {},
      loadingHash: null
    }
  },
  computed: {},
  created () {
    this.loadingHash = loading.show({ type: 'bounce' })
    helper.clearSession()
    this.query = getPageQueryObject()
    this.getJsessionId()
  },
  methods: {
    getJsessionId () {
      let { code, id } = this.query
      if (id) {
        helper.saveUserInfo({ apppartner: id })
      }
      this
        .$Weixin
        .wxCallback(code, id)
        .then((res) => {
          let data = decryptInfo(res.data, 'bindStatus')
          let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner, themeId } = data
          
          helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, apppartner, theme: themeId })
          helper.setTheme(themeId)
          if (bindStatus === '0') {
            this.$router.replace({ name: 'bindIdCard' })
          } else {
            helper.saveUserInfo({ idNumber })
            this.toPage(ifPwd)
          }
        })
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
    this.loadingHash && loading.hide(this.loadingHash)
  }
}
</script>
