<template>
  <div id="app">
    <!-- <weixin-env-tip v-if="requireWeixin"></weixin-env-tip> -->
    <vertical-screen-tip></vertical-screen-tip>
    <router-view />
  </div>
</template>

<script>
import weixinEnvTip from 'components/weixinEnvTip'
import verticalScreenTip from 'components/verticalScreenTip'
import helper from 'utils/helper'

export default {
  name: 'app',
  data () {
    return {
      theme: helper.getTheme(),
      requireWeixin: process.env.NODE_ENV !== 'development'
    }
  },
  watch: {
    '$route' ({ meta }) {
      helper.title(meta.title)
    }
  },
  created () {
    window.router = this.$router
    helper.setTheme(this.theme)
  },
  mounted () {
    document.body.addEventListener('blur', function () {
      window.scrollTo(0, 0)
    }, true)
  },
  components: {
    weixinEnvTip,
    verticalScreenTip
  }
}
</script>
