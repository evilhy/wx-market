<template>
  <div class="product-notice-wrap">
    <img class="img" src="../../../assets/img/tfinance/product-notice.png" alt="">
    <p class="text" @click="noticeFlag = true" v-html="notice"></p>
    <mt-popup v-model="noticeFlag" v-html="notice">
    </mt-popup>
  </div>
</template>
<script>
  export default {
    props: {
      notice: String
    },
    data () {
      return {
        noticeFlag: false
      }
    },
    methods: {
    }
  }
</script>