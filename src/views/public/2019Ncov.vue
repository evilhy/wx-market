<template>
  <div class="about-us-page"></div>
</template>
<script>
import sysConfig from 'utils/constant'

export default {
  data() {},
  created() {
    window.location.replace(sysConfig.zhsqShUrl[process.env.VUE_APP_ENV])
  }
}
</script>
