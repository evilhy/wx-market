<template>
  <div class="product-notice-wrap">
    <img class="img" src="../../../assets/img/tfinance/product-notice.png" alt="" />
    <p class="text" @click="noticeFlag = true" v-html="notice"></p>
    <van-popup v-model:show="noticeFlag" class="product-notice-popup">
      <div class="container">
        <div class="header"><img src="../../../assets/img/tfinance/product-notice-popup-bg.png" /></div>
        <div class="content" v-html="notice"></div>
        <div class="close" @click="noticeFlag = false"></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  props: {
    notice: String
  },
  data() {
    return {
      noticeFlag: false
    }
  },
  methods: {}
}
</script>
