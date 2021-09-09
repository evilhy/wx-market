<template>
  <span class="vcode-btn" :class="{ disabled: disabled }">
    <span class="start-btn" v-if="countDownInfo.seconds === max || countDownInfo.seconds < 0" @click="getCode">{{ startText }}</span>
    <span class="down-btn" v-else>{{ countDownInfo.seconds }}s</span>
  </span>
</template>

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
    disabled: Boolean
  },
  data() {
    return {
      countDownInfo: {
        timer: null,
        seconds: this.max
      },
      timeSessionKey: `${this.$route.name}-codetime`
    }
  },
  created() {
    this.checkCountDownInfo()
  },
  methods: {
    checkCountDownInfo() {
      const now = new Date()
      const sendTimeStamp = storage.getSession(this.timeSessionKey, now.getTime())
      this.countDownInfo.seconds = parseInt((sendTimeStamp + this.max * 1000 - now.getTime()) / 1000, 10)
      if (this.countDownInfo.seconds > 0 && this.countDownInfo.seconds < this.max) {
        this.countDown()
      } else {
        this.initCountDown()
      }
    },
    countDown() {
      clearInterval(this.countDownInfo.timer)
      this.countDownInfo.timer = setInterval(() => {
        this.countDownInfo.seconds--
        if (this.countDownInfo.seconds <= 0) {
          this.initCountDown()
        }
      }, 1000)
    },
    initCountDown() {
      clearInterval(this.countDownInfo.timer)
      this.countDownInfo.seconds = this.max
      storage.removeSession(this.timeSessionKey)
    },
    getCode() {
      if (this.disabled || this.countDownInfo.timer) return
      storage.setSession(this.timeSessionKey, new Date().getTime())
      this.countDown()
      this.$emit('tap')
    }
  }
}
</script>
