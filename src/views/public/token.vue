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
    getJsessionId () {
      this
        .$Merchant
        .callback(this.query.accessToken)
        .then((res) => {
          let { bindStatus, jsessionId, idNumber, ifPwd, headimgurl, apppartner } = res.data
          helper.saveUserInfo({ jsessionId, ifPwd, bindStatus, headimgurl, idNumber, apppartner })
          this.$router.replace({ name: 'home' })
        })
    }
  },
  components: {
    loading
  }
}
</script>