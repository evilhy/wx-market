<template>
  <van-popup v-model="flag"
            position="right"
            class="popup-page">
    <van-nav-bar :title="title" left-arrow left-text=""  @click-left="onClickLeft"  class="protocol-title back-wrap">
          <!-- <template slot="left">
            <p class="back-wrap" @click="close">
              <span class="v-arrow"></span>
            </p>
          </template> -->
    </van-nav-bar>
    <div class="content-wrap">
      <!-- <div class="content-title" v-if="title"><span class="line"></span><span class="title">{{title}}</span><span class="line"></span></div> -->
      <slot></slot>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    title: String 
  },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    show () {
      this.flag = true
    },
    close () {
      this.flag = false
      this.$emit('close')
    },
    onClickLeft() {
      this.flag = false
      this.$emit('close')
    }
  }
}
</script>