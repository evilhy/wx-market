<template>
  <div class=""></div>
</template>

<script>
import Wxapi from 'utils/wxapi'
import sysConfig from 'utils/constant'
import Loading from 'utils/loading'
import helper from 'utils/helper'
import { getPageQueryObject } from 'utils/assist'
import storage from 'utils/storage'

const wxapi = new Wxapi()
export default {
  data() {
    return {
      codeUrl: `${sysConfig.proBaseUrl[process.env.VUE_APP_ENV]}sign-code`,
      appId: sysConfig.appId[process.env.VUE_APP_ENV],
      loadingInstance: null
    }
  },
  created() {
    this.loadingInstance = new Loading({ type: 'square' })
    storage.setSession('signParams', getPageQueryObject())
    wxapi.getAuth({ appId: this.appId, redirectUrl: this.codeUrl, type: 'snsapi_base' }).catch((error) => {
      helper.toast('请使用微信扫码')
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
