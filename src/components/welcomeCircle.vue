<template>
  <div class="welcome-circle">
    <van-circle v-model="currentPercent" :rate="percent" color="#00CCCC" layer-color="#f5f5f5" />
    <img class="logo" src="../assets/img/logo-2.png" alt="">
    <p class="label">放薪工资条</p>
  </div>
</template>

<script>
export default {
  props: {
    startDelay: { // 进度开始时间，毫秒
      type: Number,
      default: 3000
    },
    auto: { // 是否自动开始
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentPercent: 5,
      percent: 0,
      timer: null,
      timeout: null
    }
  },
  created () {
    this.auto && this.startAnimation()
  },
  mounted () {
  },
  methods: {
    startAnimation () {
      this.timeout = setTimeout(() => {
        this.setAnimationInterval(2, this.createRandomNumber(70, 95))
      }, this.startDelay)
    },
    async stopAnimation () {
      clearTimeout(this.timeout)
      return new Promise((resolve) => {
        this.setAnimationInterval(10)
        this.timeout = setTimeout(() => {
          resolve()
        }, 900)
      })
    },
    setAnimationInterval (per = 2, targetPercent = 100) { // per: 每100毫秒的+进度百分比
      clearInterval(this.timer)
      this.percent += per
      this.timer = setInterval(() => {
        this.percent += per
        if (this.percent >= targetPercent) {
          clearInterval(this.timer)
        }
      }, 100)
    },
    createRandomNumber (min = 0, max = 0) {
      if (typeof min !== 'number' || typeof max !== 'number' || min >= max) throw new Error('请传入合适的参数')

      return Math.floor(Math.random() * (max - min) + (min + 1))
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
.welcome-circle {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .van-circle {
    width: 240px !important;
    height: 240px !important;
    svg {
      overflow: hidden;
    }
  }
  .logo {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-52%);
    width: 100px;
    height: auto;
  }
  .label {
    font-size: 30px;
    padding: 30px 0;
    font-family: PingFangSC-Semibold;
    color: #707579;
  }
  path {
    transform-origin: center center;
    animation: turn 2s linear infinite;
  }
}
@keyframes turn {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>