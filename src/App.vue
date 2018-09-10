<template>
  <div id="app">
    <div class="no-weixin-wrap" v-if="!isWeixin">
      <img src="./assets/img/icon-warning-blue.png" alt="" class="icon-warning">
      <p class="tip">请使用微信客户端打开</p>
    </div>
    <div class="hp-wrap" v-if="!isVerticalScreen">
      <img src="./assets/img/phone.png" alt="" class="phone">
      <p class="tip">为了您更好的体验，请使用竖屏操作~</p>
    </div>
    <router-view v-if="isWeixin && isVerticalScreen"/>
  </div>
</template>

<script>
import { listenOrientation, checkIsWeixin } from 'utils/assist'
import sysConfig from 'utils/constant'
export default {
  name: 'app',
  data () {
    return {
      isWeixin: true,
      isVerticalScreen: true
    }
  },
  mounted () {
    if (sysConfig.node_env === 'production') {
      this.isWeixin = checkIsWeixin()
    }
    listenOrientation(() => {
      this.isVerticalScreen = true
    }, () => {
      this.isVerticalScreen = false
    })
  }
}
</script>
