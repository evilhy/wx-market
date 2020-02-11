<template>
  <div class="">
  </div>
</template>

<script>
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      query: {},
      promiseUrl: `${sysConfig.pro_base_url[process.env.NODE_ENV]}virus-promise`
    }
  },
  created () {
    helper.title('武汉加油')
    this.query = getPageQueryObject()
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      let res = await this.$Virus.userInfo(this.query.code)
      helper.saveVirusUserInfo(res.data)
      window.location.replace(this.promiseUrl)
    }
  }
}
</script>