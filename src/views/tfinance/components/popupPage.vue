<template>
  <van-popup v-model="flag" position="right" class="popup-page">
    <van-nav-bar :title="title" left-arrow left-text="" @click-left="close" class="protocol-title back-wrap"> </van-nav-bar>
    <div class="content-wrap">
      <slot></slot>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    show() {
      this.flag = true
    },
    close() {
      this.flag = false
      this.$emit('close')
    }
  }
}
</script>
