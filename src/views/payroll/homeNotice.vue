<template>
  <div class="notice-bar">
    <div class="notice-count">9</div>
    <van-notice-bar :left-icon="require('../../assets/img/icon-home-notice.png')" :scrollable="false" color="#363C4D">
      <van-swipe vertical :autoplay="5000" :show-indicators="false">
        <van-swipe-item>1内内容内容容内容内容内容内容内容内容内容内容内容内容内容1</van-swipe-item>
        <van-swipe-item>2内内容内容容内容内容内容内容内容内容内容内容内容内容内容12</van-swipe-item>
        <van-swipe-item>111111111111111111111111111111111111111111111111111111111111111111</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>