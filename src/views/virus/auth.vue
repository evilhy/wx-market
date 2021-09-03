<template>
  <div class="">
  </div>
</template>

<script>
import helper from 'utils/helper'
import Wxapi from 'utils/wxapi'
import sysConfig from 'utils/constant'
import Loading from 'utils/loading'
const wxapi = new Wxapi()
export default {
  data () {
    return {
      promiseUrl: `${sysConfig.proBaseUrl[process.env.NODE_ENV]}virus-promise`,
      codeUrl: `${sysConfig.proBaseUrl[process.env.NODE_ENV]}virus-code`,
      appId: sysConfig.appId[process.env.NODE_ENV],
      loadingInstance: null
    }
  },
  created () {
    helper.title('武汉加油')
    this.loadingInstance = new Loading({ type: 'square' })
    wxapi.getAuth({ appId: this.appId, redirectUrl: this.codeUrl }).catch(() => { window.location.replace(this.promiseUrl) })
  },
  beforeDestroy () {
    this.loadingInstance && this.loadingInstance.hide()
  },
  methods: {}
}
</script>
