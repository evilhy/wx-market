<template>
  <div class="about-us-page"></div>
</template>
<script>
import sysConfig from 'utils/constant'
export default {
  data () {

  },
  created () {
    window.location.replace(sysConfig.zhsq_sh_url[process.env.NODE_ENV])
  }
}
</script>