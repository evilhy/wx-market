<template>
  <div class="bank-site-page"><img :src="sysConfig.ad_picture_url"></div>
</template>
<script>
import sysConfig from 'utils/constant'
export default {
  data () {
    return {
      sysConfig
    }
  },
  created () {
    /* window.location.replace(sysConfig.ad_picture_url) */
  }
}
</script>
