<template>
  <van-popup class="fxgj-miniprogram-popup" v-model="show" safe-area-inset-bottom close-on-popstate>
    <span class="close" @click="show = false"><van-icon name="cross" /></span>
    <div class="ewm"><img src="../assets/img/fxgj-miniprogram-ewm.png" alt="" /></div>
    <div class="tip">长按识别二维码参与活动</div>
  </van-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  created() {},
  methods: {
    open() {
      this.show = true
    }
  }
}
</script>
