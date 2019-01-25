<template>
  <span class="vcode-btn">
    <span class="start-btn" :class="{'disabled': disabled}"
          v-if="!timer || seconds < 0" @click="clickHandle">{{startText}}</span>
    <span class="down-btn"
          v-else>{{seconds}}s</span>
  </span>
</template>
<style>
  .vcode-btn{
    display: inline-flex;
    justify-content: flex-end;
  }
  .disabled{
    color: #999;
  }
</style>
<script>
import storage from 'utils/storage'
export default {
  props: {
    max: {
      type: Number,
      default: 60
    },
    startText: {
      type: String,
      default: '获取验证码'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {  // 是否限制max时间内只发送一次，默认限制
      type: Boolean,
      default: true
    },
    auto: { // 点击后是否自动开始倒计时，默认自动,如果不自动，需手动调用start方法
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      timer: null,
      seconds: this.max,
      timeSessionKey: `${this.$route.name}-codetime`
    }
  },
  created () {
    this.limit && this.checkCountDownInfo()
  },
  methods: {
    checkCountDownInfo () {
      let now = new Date()
      let sendTimeStamp = storage.getSession(this.timeSessionKey, now.getTime())
      this.seconds = parseInt((sendTimeStamp + this.max * 1000 - now.getTime()) / 1000)
      if (this.seconds > 0 && this.seconds < this.max) {
        this.countDown()
      } else {
        this.initCountDown()
      }
    },
    countDown () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.seconds--
        if (this.seconds <= 0) {
          this.initCountDown()
        }
      }, 1000)
    },
    initCountDown () {
      clearInterval(this.timer)
      this.seconds = this.max
      this.timer = null
      this.limit && storage.removeSession(this.timeSessionKey)
    },
    start () {
      if (this.disabled || (this.seconds > 0 && this.seconds < this.max)) return
      this.limit && storage.setSession(this.timeSessionKey, new Date().getTime())
      this.countDown()
    },
    clickHandle () {
      this.auto && this.start()
      this.$emit('tap')
    }
  }
}
</script>