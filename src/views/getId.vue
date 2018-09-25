<template>
  <div class="get-id-page">
    <div class="loading-wrap">
      <img src="../assets/img/loading.gif" alt="" class="loading-img">
      <p class="loading-text">加载中</p>
    </div>
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
  components: {}
}
</script>
