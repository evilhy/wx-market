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
    helper.clearUserInfo()
    this.query = getPageQueryObject()
    this.getJsessionId()
  },
  methods: {
    getJsessionId () {
      this
        .$Weixin
        .wxCallback(this.query.code)
        .then((res) => {
          let data = res.data
          helper.saveUserInfo({ jsessionId: data.jsessionId })
          if (data.bindStatus === '0') {
              this.$router.replace({ name: 'bindIdCard' })
          } else {
            helper.saveUserInfo({ idNumber: data.idNumber })
            this.toPage()
          }
        })
    },
    toPage () {
      if (!this.query.state) {
        this.$router.replace({ name: 'home' })
      } else {
        let stateObj = JSON.parse(this.query.state)
        if (stateObj.wageSheetId && stateObj.groupId) {
          helper.saveUserInfo({ groupId: stateObj.groupId })
          this.$router.replace({ name: 'wageIndex', params: { wageSheetId: stateObj.wageSheetId } })
          return
        }
        this.$router.replace({ name: 'home' })
      }
    }
  },
  components: {
    loading
  }
}
</script>
