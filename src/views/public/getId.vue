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
    async checkFreePassword (wageSheetId) {
      let res = await this.$Roll.checkFreePassword()
      if (res.data) {
        this.$router.replace({ name: 'wageIndex', params: { wageSheetId } })
      } else {
        this.$router.replace({ name: 'checkQueryCode', query: { wageSheetId } })
      }
    },
    getJsessionId () {
      let { code, id } = this.query
      if (id) {
        helper.saveUserInfo({ apppartner: id })
      }
      this
        .$Weixin
        .wxCallback(code, id)
        .then((res) => {
          let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner } = res.data
          helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, apppartner })
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
            this.checkFreePassword(wageSheetId)
          } else {
            this.$router.replace({ name: 'setQueryCode' })
          }
          return
        }
        this.$router.replace({ name: 'home' })
      }
    }
  },
  components: {
  }
}
</script>
