<template>
  <div class="bank-site-page"></div>
</template>
<script>
import sysConfig from 'utils/constant'
export default {
  data () {

  },
  created () {
    window.location.replace(sysConfig.bank_site_url)
  }
}
</script>