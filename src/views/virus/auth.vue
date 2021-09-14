<template>
  <div class=""></div>
</template>

<script>
import Wxapi from 'utils/wxapi'
import sysConfig from 'utils/constant'
import Loading from 'utils/loading'

const wxapi = new Wxapi()
export default {
  data() {
    return {
      promiseUrl: `${sysConfig.proBaseUrl[process.env.VUE_APP_ENV]}virus-promise`,
      codeUrl: `${sysConfig.proBaseUrl[process.env.VUE_APP_ENV]}virus-code`,
      appId: sysConfig.appId[process.env.VUE_APP_ENV],
      loadingInstance: null
    }
  },
  created() {
    this.loadingInstance = new Loading({ type: 'square' })
    wxapi.getAuth({ appId: this.appId, redirectUrl: this.codeUrl }).catch(() => {
      window.location.replace(this.promiseUrl)
    })
  },
  beforeDestroy() {
    if (this.loadingInstance) {
      this.loadingInstance.hide()
    }
  },
  methods: {}
}
</script>
